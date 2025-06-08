'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { ModuleDefinition } from '@/types'

export default function ModulesClient({ modules }: { modules: ModuleDefinition[] }) {
  const router = useRouter()
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Learning Modules
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Embark on your ICT trading journey with our structured modules, designed to build your knowledge step-by-step, from foundational concepts to advanced strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <Card
              key={module.id}
              onClick={() => router.push(`/modules/${module.slug}`)}
              className="cursor-pointer flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={module.imagePlaceholder}
                  alt={`Image for ${module.title.split('–')[1]?.trim() || module.title}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  data-ai-hint={module.dataAiHint}
                  priority={index < 3} // Prioritize loading for the first 3 images
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-headline text-xl">{module.title.split('–')[1]?.trim() || module.title}</CardTitle>
                  <Badge variant={module.level === 'Beginner' || module.level === 'Beginner→Intermediate' ? 'secondary' : 'outline'} className="whitespace-nowrap">
                    {module.level}
                  </Badge>
                </div>
                {module.title.includes('–') && (
                  <CardDescription className="text-xs text-muted-foreground pt-1">{module.title.split('–')[0]?.trim()}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sm text-muted-foreground line-clamp-4">
                  {module.description}
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full bg-black text-white hover:bg-black/80">
                  <Link href={`/modules/${module.slug}`}>Start</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
