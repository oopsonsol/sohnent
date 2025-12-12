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
      { 
        threshold: 0,
        rootMargin: '0px 0px -100px 0px'
      }
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
        <div className="flex-grow flex flex-col items-center justify-end pb-32 md:pb-44">
            <FadeIn className="flex flex-col items-center">
              <h1 className="text-[2.35rem] md:text-7xl font-light tracking-[0.1em] md:tracking-[0.20em] uppercase">
                Sohn<br className="md:hidden" /> Enterprises
              </h1>
              <p className="mt-8 text-[0.9rem] md:text-base tracking-[0.15em] md:tracking-[0.3em] text-foreground/70 max-w-4xl mx-auto uppercase font-light">
                Private Capital • Strategic Deployment • Global Reach
              </p>
              <p className="mt-4 text-[0.8rem] tracking-[0.1em] md:tracking-[0.25em] text-foreground/50 uppercase font-light">
                United States • LATAM Markets
              </p>
              <Button
                ref={enterButtonRef}
                variant="link"
                size="lg"
                className="mt-16 tracking-[0.3em] font-normal text-[0.8rem] md:text-xs hover:text-accent transition-colors duration-500 underline underline-offset-8"
                onClick={handleScroll}
              >
                OVERVIEW
              </Button>
            </FadeIn>
        </div>
        <div className="flex justify-center relative">
          <div className="h-16 w-px bg-foreground/[.08] relative -top-24" />
        </div>
      </section>

      <div ref={contentRef} className="scroll-mt-16">
        <section className="py-24 md:py-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-24 md:space-y-32 max-w-4xl mx-auto">
              {sections.map((section, index) => (
                <FadeIn key={index} delay={index * 200} duration={3600}>
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
