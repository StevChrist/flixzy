'use client';

import ReactLenis from 'lenis/react';
import React, { ReactNode } from 'react';

export const SmoothScrollWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      {children}
    </ReactLenis>
  );
};