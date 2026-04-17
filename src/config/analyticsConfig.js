/**
 * Centralized Configuration for Third-Party Analytics and Advertising
 * 
 * Safety Feature: IDs are only assigned in production builds. 
 * This prevents data pollution in Analytics and accidental ad clicks during development.
 */

const isProd = import.meta.env.PROD || (typeof process !== 'undefined' && process.env.NODE_ENV === 'production');

export const ANALYTICS_CONFIG = {
    // Google Analytics 4 Measurement ID
    GA_ID: isProd ? 'G-X1290XNN4W' : null,
    
    // Google AdSense Client ID
    ADSENSE_ID: isProd ? 'ca-pub-2147271038808510' : null,

    // Slot for interstitials/print modal
    ADSENSE_INBETWEEN_SLOT: isProd ? '1239783582' : null,
};

export const IS_PROD = isProd;
