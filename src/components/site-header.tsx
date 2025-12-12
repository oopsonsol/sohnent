"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useVisibility } from "@/hooks/use-visibility.tsx";

const navLinks = [
  { href: "/about", label: "OVERVIEW" },
  { href: "/contact", label: "CONTACT" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { hasEntered } = useVisibility();
  const isHome = pathname === "/";

  const showNav = !isHome || hasEntered;

  return (
    <header className="py-6 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-[1100px] mx-auto">
          <Link href="/" className="text-lg font-light tracking-[0.2em] uppercase hover:text-accent transition-colors scale-90 origin-left">
            Sohn Enterprises
          </Link>
          <nav className="flex items-center space-x-8 ml-16">
            <div className={cn("flex items-center space-x-8 transition-opacity duration-500", showNav ? 'opacity-100' : 'opacity-0')}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs tracking-[0.2em] uppercase hover:text-accent transition-colors",
                    pathname === link.href ? "text-accent font-medium" : "text-foreground/60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
