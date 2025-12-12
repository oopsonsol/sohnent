"use client";

import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/fade-in";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <FadeIn>
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-normal tracking-widest uppercase">
                CONTACT
              </h1>
              <p className="mt-4 text-base text-foreground/60">
                Inquiries are reviewed by our U.S. operations team.
              </p>
              <div className="mt-12">
                <a
                  href="mailto:operations@sohnenterprises.com"
                  className="text-lg text-foreground/90 hover:underline"
                >
                  operations@sohnenterprises.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
