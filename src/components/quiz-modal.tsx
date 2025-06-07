"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import type { QuizQuestionDefinition } from '@/types'

interface QuizModalProps {
  quiz: QuizQuestionDefinition[]
  moduleSlug: string
}

export default function QuizModal({ quiz, moduleSlug }: QuizModalProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState('')
  const [score, setScore] = useState(0)
  const router = useRouter()

  const question = quiz[index]
  const progress = Math.round((index / quiz.length) * 100)

  function handleNext() {
    if (choice === '') return
    const selected = parseInt(choice)
    if (question.options[selected]?.isCorrect) {
      setScore((s) => s + 1)
    }
    if (index === quiz.length - 1) {
      setOpen(false)
      router.push(`/modules/${moduleSlug}`)
    } else {
      setIndex((i) => i + 1)
      setChoice('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Continue</Button>
      </DialogTrigger>
      <DialogContent className="space-y-6">
        <DialogHeader>
          <DialogTitle>Quiz</DialogTitle>
          <DialogDescription>
            Question {index + 1} of {quiz.length}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="font-medium">{question.question}</p>
          <RadioGroup value={choice} onValueChange={setChoice} className="space-y-2">
            {question.options.map((opt, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem id={`opt-${i}`} value={String(i)} />
                <Label htmlFor={`opt-${i}`}>{opt.text}</Label>
              </div>
            ))}
          </RadioGroup>
          <Progress value={progress} />
        </div>
        <DialogFooter>
          <Button onClick={handleNext}>{index === quiz.length - 1 ? 'Finish' : 'Next'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
