"use client";

import { SiteHeader } from "@/components/site-header";
import { FadeIn } from "@/components/fade-in";
import Image from "next/image";

const points = [
    "Discipline-driven capital deployment",
    "Institutional regulatory compliance",
    "Discreet operational structure",
    "Discretion by design"
];

export default function FirmProfilePageContent() {
  return (
    <>
      <SiteHeader />
      <FadeIn duration={1600}>
        <section className="pt-28 md:pt-36 pb-24 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto relative">
              <div className="absolute inset-0 flex items-center justify-center -top-16 md:-top-24 z-10 pointer-events-none">
                <Image
                  src="/sohn-enterprises-se-logo.png"
                  alt="Sohn Enterprises Logo Watermark"
                  width={200}
                  height={200}
                  className="object-contain opacity-[0.08] w-48 h-48 md:w-64 md:h-64"
                  unoptimized
                />
              </div>
              <div className="relative z-20">
                <h1 className="text-3xl font-light leading-relaxed tracking-wide max-w-prose">
                  Sohn Enterprises is a privately held U.S. investment syndicate with strategic operations in LATAM.
                </h1>
                <ul className="mt-20 flex flex-col space-y-10">
                  {points.map((point, index) => (
                      <li key={index} className="flex items-center w-full max-w-md">
                          <div className="w-px h-6 bg-accent mr-6"></div>
                          <span className="text-xl text-foreground/70 tracking-wider">{point}</span>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
