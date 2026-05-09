"use client";

import React from 'react';
import Script from 'next/script';
import { ANALYTICS_CONFIG } from '@/config/analyticsConfig';

export default function ThirdPartyScripts({ children }) {
  const { GA_ID, ADSENSE_ID } = ANALYTICS_CONFIG;

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Google AdSense */}
      {ADSENSE_ID && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}

      {children}
    </>
  );
}
