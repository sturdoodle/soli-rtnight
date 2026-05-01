import { useState, useEffect } from 'react';

export const useSplitPane = (initialWidth = 50, sidebarState = false) => {
  const [splitWidth, setSplitWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const sidebarWidth = sidebarState ? 80 : 280;
      const availableWidth = window.innerWidth - sidebarWidth;
      const currentX = e.clientX - sidebarWidth;

      let newWidth = (currentX / availableWidth) * 100;

      if (newWidth < 30) newWidth = 30;
      if (newWidth > 70) newWidth = 70;

      setSplitWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, sidebarState]);

  return {
    splitWidth,
    isResizing,
    setIsResizing,
    isDesktop
  };
};
