import AppLayout from '@/components/layout/app-layout';
import GlossarySearch from '@/components/glossary-search';

export const metadata = {
  title: 'Glossary | ICT Academy Lite',
  description: 'Search and find definitions for common ICT trading terms.',
};

export default function GlossaryPage() {
  return (
    <AppLayout>
      <GlossarySearch />
    </AppLayout>
  );
}
