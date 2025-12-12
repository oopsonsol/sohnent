"use client";

import { createContext, useContext, useState, useMemo, type PropsWithChildren, type Dispatch, type SetStateAction } from 'react';

type VisibilityContextType = {
  isEnterButtonVisible: boolean;
  setEnterButtonVisible: Dispatch<SetStateAction<boolean>>;
};

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export function VisibilityProvider({ children }: PropsWithChildren) {
  const [isEnterButtonVisible, setEnterButtonVisible] = useState(true);

  const value = useMemo(() => ({
    isEnterButtonVisible,
    setEnterButtonVisible,
  }), [isEnterButtonVisible]);

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
