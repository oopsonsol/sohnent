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
              <h1 className="text-3xl md:text-4xl font-light leading-snug tracking-wide">
                Sohn Enterprises is a privately held U.S. investment syndicate with strategic operations in LATAM.
              </h1>
              <ul className="mt-20 flex flex-col items-center space-y-8">
                {points.map((point, index) => (
                    <li key={index} className="flex items-center w-full max-w-md">
                        <div className="w-px h-6 bg-accent mr-6"></div>
                        <span className="text-base text-foreground/70 tracking-wider">{point}</span>
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
