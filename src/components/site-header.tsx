"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useVisibility } from "@/hooks/use-visibility";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/about", label: "OVERVIEW" },
  { href: "/contact", label: "CONTACT" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { hasEntered } = useVisibility();

  const showNavTrigger = !isHome || hasEntered;
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showNavTrigger) {
      timeoutId = setTimeout(() => {
        setIsNavVisible(true);
      }, 7000);
    } else {
      setIsNavVisible(false);
    }

    return () => clearTimeout(timeoutId);
  }, [showNavTrigger]);

  const headerClasses = cn(
    "py-6 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
    {
      "opacity-0 -translate-y-4 pointer-events-none": !isNavVisible,
      "bg-background/[.94] backdrop-blur-sm opacity-100 translate-y-0": isNavVisible,
    }
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-[1100px] mx-auto">
          <Link
            href="/"
            className={cn(
              "text-lg font-light tracking-[0.2em] uppercase hover:text-accent transition-colors scale-90 origin-left",
              !isNavVisible && "invisible"
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
