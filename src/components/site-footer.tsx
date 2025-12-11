"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteFooter() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // This hook ensures `new Date()` is only called on the client,
    // preventing hydration mismatches.
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex flex-col text-xs text-foreground/50 tracking-widest uppercase">
            <span>© {year} Sohn Enterprises</span>
            <span>LIMITED LIABILITY COMPANY</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-foreground/50 tracking-widest uppercase">
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
