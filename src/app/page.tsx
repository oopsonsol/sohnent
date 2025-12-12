'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/fade-in';
import { SiteHeader } from '@/components/site-header';
import { useVisibility } from '@/hooks/use-visibility';

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
  const contentRef = React.useRef<HTMLDivElement>(null);
  const enterButtonRef = React.useRef<HTMLButtonElement>(null);
  const { setHasEntered } = useVisibility();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set hasEntered to false when the button IS intersecting (i.e., on-screen).
        // and true when it is NOT intersecting (i.e., off-screen).
        setHasEntered(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentButton = enterButtonRef.current;
    if (currentButton) {
      observer.observe(currentButton);
    }

    return () => {
      if (currentButton) {
        observer.unobserve(currentButton);
      }
    };
  }, [setHasEntered]);

  const handleScroll = () => {
    setHasEntered(true);
    if (!contentRef.current) return;
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SiteHeader />
      <section className="min-h-screen flex flex-col items-center text-center p-4">
        <div className="flex-grow flex flex-col items-center justify-end pb-44">
            <FadeIn className="flex flex-col items-center">
              <h1 className="text-7xl font-light tracking-[0.20em] uppercase">
                Sohn Enterprises
              </h1>
              <p className="mt-8 text-base tracking-[0.3em] text-foreground/70 max-w-4xl mx-auto uppercase font-light">
                Private Capital • Strategic Deployment • Global Reach
              </p>
              <p className="mt-4 text-xs tracking-[0.25em] text-foreground/50 uppercase font-light">
                United States • LATAM Markets
              </p>
              <Button
                ref={enterButtonRef}
                variant="link"
                size="lg"
                className="mt-16 tracking-[0.3em] font-normal text-xs hover:text-accent transition-colors duration-500 underline underline-offset-8"
                onClick={handleScroll}
              >
                ENTER
              </Button>
            </FadeIn>
        </div>
        <div className="flex justify-center relative">
          <div className="h-16 w-px bg-foreground/[.08] relative -top-24" />
        </div>
      </section>

      <div ref={contentRef} className="scroll-mt-16">
        <section className="py-32 md:py-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-32 max-w-4xl mx-auto">
              {sections.map((section, index) => (
                <FadeIn key={index} delay={index * 200} duration={3000}>
                  <div className="text-left">
                    <h2 className="text-xs font-light tracking-[0.3em] uppercase text-accent mb-6">
                      {section.title}
                    </h2>
                    <p className="text-lg text-foreground font-light leading-relaxed">
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
