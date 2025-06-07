'use client'
import { useState, useEffect } from 'react'

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

  useEffect(() => {
    setProgress(readProgress())
  }, [])

  const markLesson = (id: string) => {
    setProgress(prev => {
      if (prev.lessons.includes(id)) return prev
      const updated = { ...prev, lessons: [...prev.lessons, id] }
      writeProgress(updated)
      return updated
    })
  }

  const markQuiz = (id: string) => {
    setProgress(prev => {
      if (prev.quizzes.includes(id)) return prev
      const updated = { ...prev, quizzes: [...prev.quizzes, id] }
      writeProgress(updated)
      return updated
    })
  }

  return { progress, markLesson, markQuiz }
}
