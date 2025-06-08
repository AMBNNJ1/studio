'use client'
import { useState, useEffect } from 'react'
import { createClient } from '../../utils/supabase/client'
import type { Session, SupabaseClient } from '@supabase/supabase-js'

export interface ProgressData {
  lessons: string[]
  quizzes: string[]
}

const STORAGE_KEY = 'ict-progress'

function readProgress(): ProgressData {
  if (typeof window === 'undefined') return { lessons: [], quizzes: [] }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ProgressData
  } catch {}
  return { lessons: [], quizzes: [] }
}

function writeProgress(data: ProgressData) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({ lessons: [], quizzes: [] })
  const [session, setSession] = useState<Session | null>(null)
  const supabase: SupabaseClient = createClient()

  useEffect(() => {
    setProgress(readProgress())
    const init = async () => {
      const { data: { session: current } } = await supabase.auth.getSession()
      let s = current
      if (!s) {
        const { data } = await supabase.auth.signInAnonymously()
        s = data.session
      }
      if (!s) return
      setSession(s)
      const uid = s.user.id
      const { data } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', uid)
        .single()
      if (data) {
        const remote: ProgressData = {
          lessons: data.lessons || [],
          quizzes: data.quizzes || [],
        }
        setProgress(remote)
        writeProgress(remote)
      } else {
        await supabase.from('progress').insert({
          user_id: uid,
          lessons: [],
          quizzes: [],
        })
      }
    }
    init()
  }, [])

  const markLesson = (id: string) => {
    setProgress(prev => {
      if (prev.lessons.includes(id)) return prev
      const updated = { ...prev, lessons: [...prev.lessons, id] }
      writeProgress(updated)
      if (session) {
        supabase
          .from('progress')
          .update({ lessons: updated.lessons })
          .eq('user_id', session.user.id)
          .then(
            () => {},
            () => {}
          )
      }
      return updated
    })
  }

  const markQuiz = (id: string) => {
    setProgress(prev => {
      if (prev.quizzes.includes(id)) return prev
      const updated = { ...prev, quizzes: [...prev.quizzes, id] }
      writeProgress(updated)
      if (session) {
        supabase
          .from('progress')
          .update({ quizzes: updated.quizzes })
          .eq('user_id', session.user.id)
          .then(
            () => {},
            () => {}
          )
      }
      return updated
    })
  }

  return { progress, markLesson, markQuiz }
}
