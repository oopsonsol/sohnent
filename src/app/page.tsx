'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/fade-in';

const sections = [
  {
    title: 'Capital Deployment',
    description: 'Targeted capital deployment across real estate, structured development, and strategic land positions.',
  },
  {
    title: 'Asset Acquisition',
    description: 'Strategic ownership positions in U.S. and LATAM markets.',
  },
  {
    title: 'Development & Holdings',
    description: 'Structured, compliant, institutional-grade execution.',
  },
  {
    title: 'Regulatory Alignment',
    description: 'Operations consistent with U.S. governance standards.',
  },
];

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleEnterClick = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <FadeIn>
          <h1 className="text-5xl md:text-6xl font-normal tracking-[0.3em] uppercase">
            Sohn Enterprises
          </h1>
          <p className="mt-6 text-sm md:text-base tracking-[0.2em] text-foreground/80 max-w-4xl mx-auto uppercase">
            Private Capital • Strategic Deployment • Global Reach
          </p>
          <p className="mt-3 text-xs md:text-sm tracking-[0.2em] text-foreground/60 uppercase">
            United States • LATAM Markets
          </p>
          <Button
            variant="link"
            size="lg"
            className="mt-20 group text-foreground/80 tracking-[0.3em] font-normal text-sm"
            onClick={handleEnterClick}
          >
            ENTER
          </Button>
        </FadeIn>
      </section>

      <div ref={contentRef} className="scroll-mt-16">
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center space-y-24 max-w-4xl mx-auto">
              {sections.map((section, index) => (
                <FadeIn key={index} delay={index * 150}>
                  <div className="text-center">
                    <h2 className="text-lg font-normal tracking-[0.3em] uppercase text-accent">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-2xl text-foreground max-w-2xl mx-auto">
                      {section.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
