'use client'
import { useState, useEffect } from 'react'
import { initFirebase } from '@/lib/firebase'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  Firestore,
} from 'firebase/firestore'
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from 'firebase/auth'

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
  const [db, setDb] = useState<Firestore | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setProgress(readProgress())
    const fb = initFirebase()
    if (!fb) return
    const auth = getAuth()
    signInAnonymously(auth).catch(() => {})
    const unsubscribe = onAuthStateChanged(auth, async current => {
      if (!current) return
      setUser(current)
      setDb(fb.db)
      const ref = doc(fb.db, 'users', current.uid, 'progress', 'data')
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const remote = snap.data() as ProgressData
        setProgress(remote)
        writeProgress(remote)
      } else {
        await setDoc(ref, { lessons: [], quizzes: [] })
      }
    })
    return unsubscribe
  }, [])

  const markLesson = (id: string) => {
    setProgress(prev => {
      if (prev.lessons.includes(id)) return prev
      const updated = { ...prev, lessons: [...prev.lessons, id] }
      writeProgress(updated)
      if (db && user) {
        const ref = doc(db, 'users', user.uid, 'progress', 'data')
        updateDoc(ref, { lessons: arrayUnion(id) }).catch(() => {})
      }
      return updated
    })
  }

  const markQuiz = (id: string) => {
    setProgress(prev => {
      if (prev.quizzes.includes(id)) return prev
      const updated = { ...prev, quizzes: [...prev.quizzes, id] }
      writeProgress(updated)
      if (db && user) {
        const ref = doc(db, 'users', user.uid, 'progress', 'data')
        updateDoc(ref, { quizzes: arrayUnion(id) }).catch(() => {})
      }
      return updated
    })
  }

  return { progress, markLesson, markQuiz }
}
