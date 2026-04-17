import { useEffect } from 'react';
import { ANALYTICS_CONFIG } from '../config/analyticsConfig';

/**
 * Root Component for Third-Party Script Injection
 * 
 * Injects Google Analytics and Google AdSense scripts only if IDs are present.
 * Uses a 'lazy' strategy by injecting after initial mount to avoid blocking the main thread.
 */
const ThirdPartyScripts = ({ children }) => {
    useEffect(() => {
        // --- 1. Google Analytics Injection ---
        if (ANALYTICS_CONFIG.GA_ID) {
            const gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_ID}`;
            document.head.appendChild(gaScript);

            const gaConfigScript = document.createElement('script');
            gaConfigScript.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ANALYTICS_CONFIG.GA_ID}', { 'anonymize_ip': true });
            `;
            document.head.appendChild(gaConfigScript);
        }

        // --- 2. Google AdSense Injection ---
        if (ANALYTICS_CONFIG.ADSENSE_ID) {
            const adsenseScript = document.createElement('script');
            adsenseScript.async = true;
            adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ANALYTICS_CONFIG.ADSENSE_ID}`;
            adsenseScript.crossOrigin = "anonymous";
            document.head.appendChild(adsenseScript);
        }
    }, []);

    return <>{children}</>;
};

export default ThirdPartyScripts;
