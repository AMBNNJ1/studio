import AppLayout from '@/components/layout/app-layout'
import type { Metadata } from 'next'
import ModulesClient from './client'

export const metadata: Metadata = {
  title: 'Modules | ICT Academy Lite',
  description: 'Explore our comprehensive ICT trading modules, from beginner to advanced.',
}

export default function ModulesPage() {
  return (
    <AppLayout>
      <ModulesClient />
    </AppLayout>
  )
}
