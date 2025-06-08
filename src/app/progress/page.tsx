import AppLayout from '@/components/layout/app-layout'
import type { Metadata } from 'next'
import ProgressClient from './client'

export const metadata: Metadata = { title: 'Progress | ICT Academy Lite' }

export default function ProgressPage() {
  return (
    <AppLayout>
      <ProgressClient />
    </AppLayout>
  )
}
