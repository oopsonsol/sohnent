"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SiteFooter() {
  const [year, setYear] = useState(new Date().getFullYear());
  const pathname = usePathname();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <div className="flex items-center text-xs text-foreground/50 tracking-widest uppercase">
            <Image
              src="/sohn-enterprises-se-logo.png"
              alt="Sohn Enterprises Logo"
              width={18}
              height={18}
              className="inline-block mr-1"
            />
            <div className="flex flex-col">
              <span>© {year} Sohn Enterprises</span>
              <span className="scale-[.85] origin-center md:origin-left">LIMITED LIABILITY COMPANY</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs tracking-widest uppercase">
            <Link
              href="/contact"
              className={cn(
                "transition-colors",
                pathname === "/contact"
                  ? "text-accent"
                  : "text-foreground/50 hover:text-accent"
              )}
            >
              Contact
            </Link>
            <Link
              href="/investors"
              className={cn(
                "transition-colors",
                pathname === "/investors"
                  ? "text-accent"
                  : "text-foreground/50 hover:text-accent"
              )}
            >
              Investors
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
