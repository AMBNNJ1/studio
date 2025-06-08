import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/modules">Browse Modules</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
