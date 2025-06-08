"use client";

import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Award, Target, PlaySquare, FileQuestion, Users, ArrowRight, BookCopy } from 'lucide-react';
import Image from 'next/image';
import { allModules } from '@/lib/modules-data';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Profitable Trader',
};

export default function Home() {
  const router = useRouter();
  const features = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Focused ICT Curriculum",
      description: "Master specific ICT concepts with our targeted lessons and avoid information overload.",
      dataAiHint: "education focus"
    },
    {
      icon: <PlaySquare className="h-10 w-10 text-primary" />,
      title: "Engaging Video Lessons",
      description: "Learn through high-quality video content that breaks down complex topics into understandable segments.",
      dataAiHint: "video play"
    },
    {
      icon: <FileQuestion className="h-10 w-10 text-primary" />,
      title: "Interactive Quizzes",
      description: "Test your understanding and reinforce learning with interactive quizzes after each module.",
      dataAiHint: "quiz test"
    },
  ];

  const testimonials = [
    {
      quote: "The concise lessons and practical examples significantly improved my understanding of market structure. Highly recommended!",
      author: "Alex P.",
      role: "Aspiring Trader",
      avatarUrl: "https://placehold.co/100x100.png",
      avatarFallback: "AP",
      dataAiHint: "person portrait"
    },
    {
      quote: "I finally grasp Fair Value Gaps thanks to this platform. The AI glossary is a game-changer for quick lookups.",
      author: "Maria K.",
      role: "Day Trader",
      avatarUrl: "https://placehold.co/100x100.png",
      avatarFallback: "MK",
      dataAiHint: "person happy"
    },
  ];

  const displayedModules = allModules.slice(0, 3); 

  return (
    <AppLayout>
      <section className="py-16 text-center md:py-24 lg:py-32">
        <div className="container mx-auto max-w-3xl px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Become a Profitable Trader
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Unlock the secrets of Inner Circle Trader methodology with concise lessons, engaging videos, and interactive quizzes. Start your journey to trading proficiency today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-4">
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              <Link href="/modules">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="text-center mb-12">
          <BookCopy className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Modules
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into curated learning paths designed to build your ICT knowledge step-by-step.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedModules.map((module, index) => (
            <Card
              key={module.id}
              onClick={() => router.push(`/modules/${module.slug}`)}
              className="cursor-pointer flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={module.imagePlaceholder}
                  alt={`Image for ${module.title.split('–')[1]?.trim() || module.title}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  data-ai-hint={module.dataAiHint}
                  priority={index < 2}
                />
              </div>
              <CardHeader>
                 <div className="flex items-center justify-between">
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{module.title.split('–')[1]?.trim() || module.title}</CardTitle>
                    <Badge variant={module.level === 'Beginner' || module.level === 'Beginner→Intermediate' ? 'secondary' : 'outline'} className="whitespace-nowrap">
                      {module.level}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground pt-1">{module.title.split('–')[0]?.trim()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {module.description}
                </p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/modules/${module.slug}`}>View Module</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
         <div className="mt-12 text-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/modules">
              Explore All Modules
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="text-center mb-12">
          <Award className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose ICT Academy Lite?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the features that make learning effective and engaging, tailored for your trading success.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300" data-ai-hint={feature.dataAiHint}>
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="text-center mb-12">
          <Users className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hear From Our Learners
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how ICT Academy Lite has helped traders like you achieve their learning goals.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300" data-ai-hint={testimonial.dataAiHint}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <blockquote className="text-lg italic text-foreground before:content-['“'] after:content-['”']">
                      {testimonial.quote}
                    </blockquote>
                    <p className="mt-4 font-semibold text-primary">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
