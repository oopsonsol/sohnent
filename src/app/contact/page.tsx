"use client";

import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";
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
                Contact
              </h1>
              <p className="mt-4 text-base text-foreground/60">
                Inquiries are directed to our U.S. operations team for review.
              </p>
            </div>
            <div className="max-w-xl mx-auto mt-12">
              <ContactForm />
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
