import AppLayout from '@/components/layout/app-layout'
import type { Metadata } from 'next'
import ModulesClient from './client'
import { fetchModules } from '@/lib/supabase-content'

export const metadata: Metadata = {
  title: 'Modules | ICT Academy Lite',
  description: 'Explore our comprehensive ICT trading modules, from beginner to advanced.',
}

export default async function ModulesPage() {
  const modules = await fetchModules()
  return (
    <AppLayout>
      <ModulesClient modules={modules} />
    </AppLayout>
  )
}
