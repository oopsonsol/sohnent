"use client";

import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";

export default function InvestorsPage() {
  return (
    <>
      <SiteHeader />
      <FadeIn>
        <section className="py-36 md:py-48">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-normal tracking-widest uppercase">
                INVESTOR PORTAL
              </h1>
              <p className="mt-4 text-base text-foreground/60">
                Access restricted to qualified parties.
                <br />
                Please sign in to continue.
              </p>
              <div className="mt-12">
                <Button
                  variant="outline"
                  className="bg-transparent text-foreground hover:bg-foreground hover:text-background border-foreground/30 hover:border-foreground"
                >
                  SIGN IN
                </Button>
              </div>
              <p className="mt-12 text-xs text-foreground/40">
                Access available only to pre-approved investors.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
