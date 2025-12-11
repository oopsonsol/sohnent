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
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-foreground text-background">
                <span className="text-sm font-bold">N</span>
            </div>
            <p className="text-xs text-foreground/50 tracking-widest uppercase">
              © {year} Sohn Enterprises
            </p>
        </div>
        <div className="flex items-center gap-6 text-xs text-foreground/50 tracking-widest uppercase">
          <span>United States</span>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
