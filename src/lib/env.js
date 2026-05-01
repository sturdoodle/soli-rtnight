/**
 * Shared environment utilities for Next.js App Router.
 */

export const isBrowser = typeof window !== 'undefined';

export const isDevelopmentMode = isBrowser && (
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' || 
  window.location.hostname.startsWith('192.168.') ||
  window.location.hostname.startsWith('10.') ||
  window.location.hostname.endsWith('.local')
);

export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;
