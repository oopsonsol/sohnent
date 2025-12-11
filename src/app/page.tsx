'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

const sections = [
  {
    title: 'Capital Deployment',
    description: 'Selective, disciplined capital allocation across diversified sectors.',
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
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <FadeIn>
          <h1 className="text-5xl md:text-6xl font-normal tracking-[0.2em] uppercase">
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
            className="mt-20 group text-foreground/80 tracking-[0.2em] font-normal text-sm"
            onClick={handleEnterClick}
          >
            ENTER
          </Button>
        </FadeIn>
      </section>

      <div ref={contentRef} className="scroll-mt-16">
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-6xl mx-auto">
              {sections.map((section, index) => (
                <FadeIn key={index}>
                  <div >
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80">
                      {section.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
