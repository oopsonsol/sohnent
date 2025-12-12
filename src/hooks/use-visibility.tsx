"use client";

import { createContext, useContext, useState, type ReactNode } from 'react';

type VisibilityContextType = {
  hasEntered: boolean;
  setHasEntered: (hasEntered: boolean) => void;
};

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export function VisibilityProvider({ children }: { children: ReactNode }) {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <VisibilityContext.Provider value={{ hasEntered, setHasEntered }}>
      {children}
    </VisibilityContext.Provider>
  );
}

export function useVisibility() {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
}
