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
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);
  }, []);

  useEffect(() => {
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
      // console.log('PWA was installed');
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
    // Check both local state and global stashed event for maximum reliability
    const promptToUse = deferredPrompt || globalDeferredPrompt;

    if (!promptToUse) {
      const isMobile = /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        alert("To install: Tap your browser's menu (three dots) and select 'Install App' or 'Add to Home Screen'.");
      } else {
        alert("Preparing installation... Please wait a moment and try again, or check your browser's address bar for the install icon.");
      }
      return;
    }

    try {
      // Show the install prompt using the most reliable available event
      await promptToUse.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await promptToUse.userChoice;
      // console.log(`User response to the install prompt: ${outcome}`);

      if (outcome === 'accepted') {
        setIsInstalled(true);
      }

      // Clear both local and global stashed events after use
      setDeferredPrompt(null);
      globalDeferredPrompt = null;
      setIsInstallable(false);
    } catch (err) {
      console.error('Error during PWA installation:', err);
    }
  };

  // Show the UI immediately if not installed (excluding iOS)
  const finalIsInstallable = isIOS ? false : !isInstalled;

  return { 
    isInstallable: finalIsInstallable, 
    isInstalled, 
    handleInstallClick, 
    isIOS 
  };
};
