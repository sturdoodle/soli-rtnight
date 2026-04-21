import { useState, useEffect } from 'react';

export const useSplitPane = (initialWidth = 50, sidebarState = false) => {
  const [splitWidth, setSplitWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    window.addEventListener('resize', handleResize);
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
