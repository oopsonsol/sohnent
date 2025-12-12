"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const [year, setYear] = useState(new Date().getFullYear());
  const pathname = usePathname();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex flex-col text-xs text-foreground/50 tracking-widest uppercase">
            <span>© {year} Sohn Enterprises</span>
            <span className="scale-[.85] origin-left">LIMITED LIABILITY COMPANY</span>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
