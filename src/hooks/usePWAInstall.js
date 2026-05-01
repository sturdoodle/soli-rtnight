import { useState, useEffect } from 'react';

// Global variable to capture the event before the hook mounts
let globalDeferredPrompt = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    globalDeferredPrompt = e;
  });
}

/**
 * Custom hook to handle PWA installation logic.
 * Captures the 'beforeinstallprompt' event and provides a trigger function.
 */
export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(globalDeferredPrompt);
  const [isInstallable, setIsInstallable] = useState(!!globalDeferredPrompt);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      globalDeferredPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handler);

    const appInstalledHandler = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      globalDeferredPrompt = null;
      console.log('PWA was installed');
    };

    window.addEventListener('appinstalled', appInstalledHandler);

    // Initial sync with global variable
    if (globalDeferredPrompt && !deferredPrompt) {
      setDeferredPrompt(globalDeferredPrompt);
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If we don't have a prompt, it's likely because the browser hasn't fired it yet
      // or the app is already installed/not supported.
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        alert("To install: Tap the browser menu (three dots or share icon) and select 'Add to Home Screen'.");
      } else {
        alert("Installation is being initialized. If you don't see a prompt, please check your browser's address bar for the install icon or use the browser menu.");
      }
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);

      if (outcome === 'accepted') {
        setIsInstalled(true);
      }

      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      globalDeferredPrompt = null;
      setIsInstallable(false);
    } catch (err) {
      console.error('Error during PWA installation:', err);
    }
  };

  return { isInstallable, isInstalled, handleInstallClick };
};
