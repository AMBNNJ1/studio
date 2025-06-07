'use client'
import { useEffect } from 'react'
import { useProgress } from '@/hooks/use-progress'

export default function LessonProgress({ id }: { id: string }) {
  const { markLesson } = useProgress()
  useEffect(() => {
    if (id) markLesson(id)
  }, [id, markLesson])
  return null
}
