'use client'
import { Progress as ProgressBar } from '@/components/ui/progress'
import { useModules } from '@/hooks/use-modules'
import { useProgress } from '@/hooks/use-progress'

export default function ProgressClient() {
  const { progress } = useProgress()
  const modules = useModules()

  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)
  const totalQuizzes = modules.filter(m => (m.quiz?.length || 0) > 0).length
  const total = totalLessons + totalQuizzes
  const completed = progress.lessons.length + progress.quizzes.length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  const lessonInfo = progress.lessons.map(id => {
    const [mod, les] = id.split(':')
    const currentModule = modules.find(m => m.slug === mod)
    const lesson = currentModule?.lessons?.find(l => l.id === les)
    return lesson ? `${currentModule?.title.split('–')[1]?.trim() || currentModule?.title} - ${lesson.title}` : id
  })

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">Your Progress</h1>
      <div>
        <ProgressBar value={percent} />
        <p className="mt-2 text-sm text-muted-foreground">{percent}% complete</p>
      </div>
      <div>
        <h2 className="font-semibold text-xl mb-2">Completed Lessons</h2>
        {lessonInfo.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {lessonInfo.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No lessons completed yet.</p>
        )}
      </div>
      <div>
        <h2 className="font-semibold text-xl mb-2">Completed Quizzes</h2>
        {progress.quizzes.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {progress.quizzes.map(id => {
              const currentModule = modules.find(m => m.slug === id)
              const title = currentModule?.title.split('–')[1]?.trim() || currentModule?.title || id
              return <li key={id}>{title}</li>
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground">No quizzes completed yet.</p>
        )}
      </div>
    </div>
  )
}
