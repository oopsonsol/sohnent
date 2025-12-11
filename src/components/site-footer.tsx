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
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <p className="text-sm text-foreground/60">
          © {year} Sohn Enterprises
        </p>
        <div className="flex items-center gap-6 text-sm text-foreground/60">
          <span>United States</span>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
