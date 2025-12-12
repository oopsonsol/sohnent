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
      <FadeIn duration={3200}>
        <section className="pt-28 md:pt-36 pb-24 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-light leading-9 tracking-wide">
                Sohn Enterprises is a privately held U.S. investment syndicate with strategic operations in LATAM.
              </h1>
              <ul className="mt-20 flex flex-col space-y-8">
                {points.map((point, index) => (
                    <li key={index} className="flex items-center w-full max-w-md">
                        <div className="w-px h-6 bg-accent mr-6"></div>
                        <span className="text-[17px] text-foreground/70 tracking-wider">{point}</span>
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
