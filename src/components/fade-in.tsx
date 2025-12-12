"use client";
import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export function FadeIn({ children, className, delay = 0 }: PropsWithChildren<{ className?: string, delay?: number }>) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => setVisible(true), delay);
        observer.unobserve(domRef.current!);
      }
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={cn(
        'transition-all duration-[1500ms] ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {children}
    </div>
  );
}
