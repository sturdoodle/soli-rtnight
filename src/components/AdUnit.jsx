import { useEffect, useRef } from 'react';
import { ANALYTICS_CONFIG, IS_PROD } from '../config/analyticsConfig';

/**
 * Robust AdSense Component for Next.js
 * 
 * Features:
 * 1. CLS Prevention: Enforces min-height.
 * 2. Smart Initialization: Waits for window.adsbygoogle to be available.
 * 3. SPA Friendly: Handles navigation and tab switching.
 * 4. Development Safe: Shows high-fidelity placeholders instead of real ads.
 */
const AdUnit = ({ 
    slot = ANALYTICS_CONFIG.DEFAULT_AD_SLOT, 
    format = 'auto', 
    style = { display: 'block' },
    minHeight = '100px',
    className = '' 
}) => {
    const adRef = useRef(null);
    const initialized = useRef(false);

    useEffect(() => {
        // Only run initialization in Production and if not already initialized for this slot
        if (!IS_PROD || !slot) return;
        
        let retryCount = 0;
        const maxRetries = 10;
        
        const initAd = () => {
            if (initialized.current) return;

            try {
                if (window.adsbygoogle && window.adsbygoogle.push) {
                    // Safety check: only push if the 'ins' tag exists in our container
                    if (adRef.current && adRef.current.querySelector('ins.adsbygoogle:not([data-ad-status])')) {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        initialized.current = true;
                        if (!IS_PROD) console.log(`[AdSense] Initialized slot: ${slot}`);
                    }
                } else if (retryCount < maxRetries) {
                    // Script not ready yet, retry in 500ms
                    retryCount++;
                    setTimeout(initAd, 500);
                }
            } catch (err) {
                console.error(`[AdSense] Error initializing slot ${slot}:`, err);
            }
        };

        // Small delay to ensure DOM is fully ready for AdSense to measure container width
        const timeoutId = setTimeout(initAd, 300);

        return () => {
            clearTimeout(timeoutId);
            // Note: AdSense doesn't provide a cleanup method for push-based units
            // but we reset our local initialized ref if the component unmounts
            initialized.current = false;
        };
    }, [slot]);

    // 1. Development Mode: High-fidelity placeholder
    if (!IS_PROD) {
        return (
            <div 
                className={`flex items-center justify-center border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-md text-slate-400 rounded-2xl transition-all hover:bg-white dark:hover:bg-slate-900 shadow-sm group/ad print:hidden ${className}`}
                style={{ minHeight, ...style }}
            >
                <div className="text-center select-none px-6 py-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Ad Space
                        </p>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 opacity-60">
                        Slot: {slot}
                    </div>
                </div>
            </div>
        );
    }

    // 2. Production Mode: Real AdSense Unit
    return (
        <div 
            ref={adRef}
            className={`adsense-wrapper w-full overflow-hidden print:hidden ${className}`}
            style={{ minHeight, ...style }}
        >
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client={ANALYTICS_CONFIG.ADSENSE_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default AdUnit;
