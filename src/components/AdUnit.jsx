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
                className={`flex items-center justify-center border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 rounded-2xl transition-all hover:border-slate-400 hover:bg-slate-100/80 ${className}`}
                style={{ minHeight, ...style }}
            >
                <div className="text-center select-none px-6">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                        Dev Mode: Google AdSense
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 border border-slate-200 rounded-lg shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Slot ID:</span>
                        <code className="text-[10px] font-mono font-bold text-slate-600">{slot || 'undefined'}</code>
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
