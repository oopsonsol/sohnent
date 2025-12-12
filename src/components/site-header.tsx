"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useVisibility } from "@/hooks/use-visibility";

const navLinks = [
  { href: "/firm-profile", label: "FIRM PROFILE" },
  { href: "/contact", label: "CONTACT" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { hasEntered } = useVisibility();
  
  const isNavVisible = !isHome || hasEntered;

  const headerClasses = cn(
    "py-4 md:py-6 fixed top-0 left-0 right-0 z-50 transition-all ease-out",
    isHome ? "delay-1000" : "",
    isNavVisible ? "duration-500" : "duration-300",
    {
      "opacity-0 -translate-y-4 pointer-events-none": !isNavVisible,
      "opacity-100 translate-y-0": isNavVisible,
      "bg-background/[.94] backdrop-blur-sm": isNavVisible,
    }
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-[1100px] mx-auto">
          <Link
            href="/"
            className={cn(
              "text-lg font-light tracking-[0.2em] uppercase hover:text-accent transition-colors scale-[.80] origin-left",
              !isNavVisible && "invisible",
              isHome && "invisible"
            )}
          >
            Sohn Enterprises
          </Link>
          <nav className="flex items-center space-x-4 md:space-x-8">
            <div className="flex items-center space-x-4 md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[10px] tracking-widest md:text-xs md:tracking-[0.2em] uppercase hover:text-accent transition-colors scale-[.95]",
                    pathname === link.href
                      ? "text-accent font-medium"
                      : "text-foreground/60"
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
