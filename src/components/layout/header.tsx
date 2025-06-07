import Link from 'next/link';
import { Moon, Search, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="bg-background">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-foreground"
          >
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2" />
            <circle cx="14" cy="14" r="8" fill="currentColor" />
          </svg>
          <span className="text-2xl font-semibold text-foreground">Core</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            href="/progress"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Progress
          </Link>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
          <Button variant="secondary" className="rounded-full px-6 py-2 text-sm">
            Log in
          </Button>
        </nav>
      </div>
    </header>
  );
}
