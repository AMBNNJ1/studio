import { createClient } from '../../utils/supabase/server'
import type { ModuleDefinition, LessonDefinition } from '@/types'

export async function fetchModules(): Promise<ModuleDefinition[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('modules')
    .select('id, slug, title, level, description, imagePlaceholder, dataAiHint, quiz')
    .order('id')
  if (error) throw error
  return data as ModuleDefinition[]
}

export async function fetchModule(slug: string): Promise<ModuleDefinition | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('modules')
    .select('id, slug, title, level, description, imagePlaceholder, dataAiHint, quiz')
    .eq('slug', slug)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return (data as ModuleDefinition) || null
}

export async function fetchLessons(moduleSlug: string): Promise<LessonDefinition[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title, keyTakeaways, videoUrl')
    .eq('module_slug', moduleSlug)
    .order('id')
  if (error) throw error
  return data as LessonDefinition[]
}

export async function fetchLessonContent(moduleSlug: string, lessonId: string): Promise<string | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lessons')
    .select('content')
    .eq('module_slug', moduleSlug)
    .eq('id', lessonId)
    .single()
  if (error) throw error
  return data?.content ?? null
}
