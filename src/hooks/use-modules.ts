'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@utils/supabase/client'
import type { ModuleDefinition } from '@/types'

export function useModules() {
  const [modules, setModules] = useState<ModuleDefinition[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('modules')
      .select('id, slug, title, level, description, imagePlaceholder, dataAiHint, quiz')
      .order('id')
      .then(({ data }) => {
        if (data) setModules(data as ModuleDefinition[])
      })
  }, [])

  return modules
}
