"use client";

import React from 'react';
import { ResumeProvider } from '@/Modern/context/ResumeContext';
import { NotificationProvider } from '@/context/NotificationContext';
import GlobalErrorBoundary from '@/components/GlobalErrorBoundary';
import ThirdPartyScripts from '@/components/ThirdPartyScripts';

export function Providers({ children }) {
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            // console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          (err) => {
            // console.error('ServiceWorker registration failed: ', err);
          }
        );
      });
    }
  }, []);

  return (
    <ResumeProvider>
      <GlobalErrorBoundary>
        <NotificationProvider>
          <ThirdPartyScripts>
            {children}
          </ThirdPartyScripts>
        </NotificationProvider>
      </GlobalErrorBoundary>
    </ResumeProvider>
  );
}
