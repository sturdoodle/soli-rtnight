import { useState, useEffect } from 'react';

export const useSplitPane = (initialWidth = 50, sidebarCollapsed = false) => {
  // Use a stable key for persistence
  const STORAGE_KEY = 'v5_editor_split_width';
  
  const [splitWidth, setSplitWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? parseFloat(saved) : initialWidth;
    }
    return initialWidth;
  });
  
  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1280 : true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      const desktop = window.innerWidth >= 1280;
      setIsDesktop(desktop);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isResizing) {
      localStorage.setItem(STORAGE_KEY, splitWidth.toString());
    }
  }, [splitWidth, isResizing]);

  useEffect(() => {
    const handleMove = (e) => {
      if (!isResizing) return;

      // Use actual clientX from either mouse or touch
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      
      // Sidebar width from V5Sidebar: w-24 (96px) or w-72 (288px)
      const sidebarWidth = sidebarCollapsed ? 96 : 288;
      const availableWidth = window.innerWidth - sidebarWidth;
      const currentX = clientX - sidebarWidth;

      let newWidth = (currentX / availableWidth) * 100;

      // Constrain within reasonable bounds
      if (newWidth < 25) newWidth = 25;
      if (newWidth > 75) newWidth = 75;

      setSplitWidth(newWidth);
    };

    const handleEnd = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      document.body.style.webkitUserSelect = 'auto';
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
      
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isResizing, sidebarCollapsed]);

  return {
    splitWidth,
    isResizing,
    setIsResizing,
    isDesktop
  };
};

