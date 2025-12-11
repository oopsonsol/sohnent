"use client";

import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/fade-in";

const points = [
    "Discipline-driven capital deployment",
    "Institutional regulatory compliance",
    "Discreet operational structure",
    "Detail intentionally limited"
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <FadeIn>
        <section className="py-24 md:py-40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
                Sohn Enterprises is a privately held U.S. investment syndicate with strategic operations in LATAM.
              </h1>
              <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
                {points.map((point, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-accent text-xl mr-4 mt-1">∙</span>
                        <span className="text-lg text-foreground/80">{point}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
