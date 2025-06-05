export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ICT Academy Lite. All rights reserved.
        </p>
        {/* Add social links or other footer content here */}
      </div>
    </footer>
  );
}
