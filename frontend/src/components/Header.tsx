import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
            T
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Todo App</h1>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}