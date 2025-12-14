'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/fade-in';
import { SiteHeader } from '@/components/site-header';
import { useVisibility } from '@/hooks/use-visibility';
import Image from 'next/image';

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

export default function HomePage() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const enterButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const { setHasEntered } = useVisibility();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      <section className="min-h-screen flex flex-col items-center text-center p-4 relative">
        <div className="flex-grow flex flex-col items-center justify-end pb-40 md:pb-52 z-20">
            <FadeIn className="flex flex-col items-center" duration={1600}>
              <div className="relative mb-8 z-20">
                <Image
                  src="/sohn-enterprises-se-logo.png"
                  alt="Sohn Enterprises Key Logo"
                  width={100}
                  height={100}
                  className="opacity-[0.12] mx-auto"
                />
              </div>
              <h1 className="text-[2.35rem] md:text-7xl font-light tracking-[0.1em] md:tracking-[0.20em] uppercase z-20">
                Sohn<br className="md:hidden" /> Enterprises
              </h1>
              <p className="mt-8 text-[0.9rem] md:text-[17px] tracking-[0.15em] md:tracking-[0.25em] text-foreground/70 max-w-4xl mx-auto uppercase font-normal z-20">
                Private Capital • Strategic Deployment • Global Reach
              </p>
              <p className="mt-4 text-sm tracking-[0.1em] md:tracking-[0.25em] text-foreground/50 uppercase font-normal z-20">
                United States • LATAM Markets
              </p>
              <Button
                ref={enterButtonRef}
                variant="link"
                size="lg"
                className="mt-16 tracking-[0.3em] font-normal text-xs md:text-xs hover:text-accent transition-colors duration-500 underline underline-offset-8 z-20"
                onClick={handleScroll}
              >
                OVERVIEW
              </Button>
            </FadeIn>
        </div>
        <div className="flex justify-center relative z-10">
          <FadeIn duration={1700} delay={500}>
            <div
              className="h-[54px] w-px relative -top-28"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, hsl(var(--foreground)) 30%, hsl(var(--foreground)) 70%, transparent)",
                opacity: 0.48,
              }}
            />
          </FadeIn>
        </div>
      </section>

      <div ref={contentRef} className="scroll-mt-16">
        <section className="pt-0 pb-24 md:py-36 md:pt-36">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-16 md:space-y-24 max-w-4xl mx-auto">
              {sections.map((section, index) => (
                <FadeIn key={index} delay={index * 200} duration={1337}>
                  <div className="text-left">
                    <h2 className="text-sm md:text-[17px] font-bold tracking-[0.3em] uppercase text-accent mb-6">
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
