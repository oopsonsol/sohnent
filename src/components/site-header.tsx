"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useVisibility } from "@/hooks/use-visibility";
import { ChevronLeft } from "lucide-react";
import React from "react";
import Image from "next/image";

const navLinks = [
  { href: "/firm-profile", label: "FIRM PROFILE" },
  { href: "/contact", label: "CONTACT" },
  { href: "/investors", label: "INVESTORS" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { hasEntered } = useVisibility();
  
  const isNavVisible = !isHome || hasEntered;
  const isInteriorPage = ["/firm-profile", "/contact", "/investors"].includes(pathname);

  const headerClasses = cn(
    "py-4 md:py-6 fixed top-0 left-0 right-0 z-50 transition-all ease-out",
    isHome ? "transition-delay-[250ms]" : "",
    isNavVisible ? "duration-500" : "duration-300",
    {
      "opacity-0 -translate-y-4 pointer-events-none": !isNavVisible,
      "opacity-100 translate-y-0": isNavVisible,
    }
  );

  return (
    <header className={headerClasses}>
       {isNavVisible && (
        <>
          <div
            className="absolute inset-0 -z-10 border-b border-black/5"
            style={{
              backgroundColor: 'hsla(var(--background-hsl), 0.75)',
              backdropFilter: 'blur(10px)',
            }}
          />
        </>
      )}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-[1100px] mx-auto relative">
          
          <div className="flex items-center">
            {isInteriorPage && (
              <Link href="/" className="inline-flex items-center text-foreground/60 hover:text-accent transition-colors md:hidden">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            )}
             <Link
              href="/"
              className={cn(
                "items-center text-lg font-light tracking-[0.2em] uppercase hover:text-accent transition-colors",
                "hidden",
                !isHome && "md:flex"
              )}
            >
              <Image 
                src="/sohn-enterprises-se-logo.png"
                alt="Sohn Enterprises Logo"
                width={28}
                height={28}
                className="mr-2"
              />
              Sohn Enterprises
            </Link>
          </div>

          <nav className="flex-1 flex justify-center md:justify-end">
            <div className="flex items-center space-x-3">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[13.5px] tracking-widest md:tracking-[0.2em] uppercase hover:text-accent transition-colors scale-[.95] whitespace-nowrap",
                      pathname === link.href
                        ? "text-accent font-medium"
                        : "text-foreground/60"
                    )}
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="text-foreground/20 scale-[.95]">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
