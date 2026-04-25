import { useEffect, useRef } from 'react';
import { ANALYTICS_CONFIG, IS_PROD } from '../config/analyticsConfig';

/**
 * Smart Ad Component
 * 
 * In Production: Renders the real Google AdSense unit and triggers initialization.
 * In Development: Renders a visually distinct placeholder with a dashed border 
 * and "Advertisement" text to aid layout visualization without loading real ads.
 * 
 * Safety Feature: min-height is enforced to prevent Layout Shift (CLS) when ads load.
 */
const AdUnit = ({ 
    slot = ANALYTICS_CONFIG.DEFAULT_AD_SLOT, 
    format = 'auto', 
    style = { display: 'block' },
    minHeight = '100px', // Essential to prevent Cumulative Layout Shift (CLS)
    className = '' 
}) => {
    const initialized = useRef(false);

    useEffect(() => {
        // Only initialize real ads in production
        if (IS_PROD && !initialized.current && slot) {
            try {
                if (window.adsbygoogle) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    initialized.current = true;
                }
            } catch (err) {
                // Silently handle ad blocking or failures
            }
        }
    }, [slot]);

    // 1. Development Mode: Render a visually distinct placeholder
    if (!IS_PROD) {
        return (
            <div 
                className={`flex items-center justify-center border border-black/5 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-md text-slate-400 rounded-[2.5rem] transition-all hover:bg-white dark:hover:bg-slate-900 shadow-sm group/ad ${className}`}
                style={{ minHeight, ...style }}
            >
                <div className="text-center select-none px-6 py-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 group-hover/ad:text-blue-500 transition-colors">
                            Development Ad Space
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/80 dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-full shadow-inner transition-transform group-hover/ad:scale-105 duration-500">
                        <span className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">AdSense Slot</span>
                        <code className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">{slot || 'undefined'}</code>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Production Mode: Render the real AdSense tag
    return (
        <div 
            className={`adsense-wrapper w-full overflow-hidden ${className}`}
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
