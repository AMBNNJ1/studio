import Link from 'next/link';
import { BookOpenText } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BookOpenText className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold text-foreground">ICT Academy Lite</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/glossary" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Glossary
          </Link>
          {/* Placeholder for future nav items like Dashboard, Theme Toggle */}
        </nav>
      </div>
    </header>
  );
}
