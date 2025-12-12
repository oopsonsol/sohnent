"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useVisibility } from "@/hooks/use-visibility";

const navLinks = [
  { href: "/about", label: "OVERVIEW" },
  { href: "/contact", label: "CONTACT" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { hasEntered } = useVisibility();

  const showNav = !isHome || hasEntered;

  // Base classes with transition and the requested delay
  const baseHeaderClasses = "py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out delay-[7000ms]";
  
  // Classes for the "hidden" state on the homepage
  const hiddenStateClasses = "opacity-0 -translate-y-4 pointer-events-none";

  // Classes for the "visible" state on the homepage
  const visibleStateClasses = "bg-background/[.94] backdrop-blur-sm opacity-100 translate-y-0";

  // Determine the final class string
  const headerClassName = isHome
    ? `${baseHeaderClasses} ${showNav ? visibleStateClasses : hiddenStateClasses}`
    : baseHeaderClasses;


  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-[1100px] mx-auto">
          <Link
            href="/"
            className={cn(
              "text-lg font-light tracking-[0.2em] uppercase hover:text-accent transition-colors scale-90 origin-left",
              isHome && "invisible"
            )}
          >
            Sohn Enterprises
          </Link>
          <nav className="flex items-center space-x-8 ml-16">
            <div className="flex items-center space-x-8">
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
