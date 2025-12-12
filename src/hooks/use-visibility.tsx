"use client";

import { createContext, useContext, useState, useMemo, type PropsWithChildren } from 'react';

type VisibilityContextType = {
  hasEntered: boolean;
  setHasEntered: (hasEntered: boolean) => void;
};

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export function VisibilityProvider({ children }: PropsWithChildren) {
  const [hasEntered, setHasEntered] = useState(false);

  const value = useMemo(() => ({
    hasEntered,
    setHasEntered,
  }), [hasEntered]);

  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
}

export function useVisibility() {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
}
