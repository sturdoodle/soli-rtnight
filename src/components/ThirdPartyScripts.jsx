"use client";

import React, { useEffect } from 'react';

export default function ThirdPartyScripts({ children }) {
  useEffect(() => {
    // Example: Google Analytics injection
    // if (process.env.NODE_ENV === 'production') {
    //   const script = document.createElement('script');
    //   script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
    //   script.async = true;
    //   document.head.appendChild(script);
    //   ...
    // }
  }, []);

  return <>{children}</>;
}
