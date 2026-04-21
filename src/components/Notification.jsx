import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Notification = () => {
  const { notification, hideNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [notification]);

  if (!notification) return null;

  const icons = {
    success: <CheckCircle className="text-emerald-500" size={20} />,
    error: <XCircle className="text-rose-500" size={20} />,
    warning: <AlertCircle className="text-amber-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  const bgColors = {
    success: 'bg-emerald-500/10 border-emerald-500/20',
    error: 'bg-rose-500/10 border-rose-500/20',
    warning: 'bg-amber-500/10 border-amber-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
  };

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] transition-all duration-500 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${bgColors[notification.type] || bgColors.info}`}>
        <div className="shrink-0">
          {icons[notification.type] || icons.info}
        </div>
        <p className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-100 pr-2">
          {notification.message}
        </p>
        <button
          onClick={hideNotification}
          className="ml-auto p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X size={16} />
        </button>
        
        {/* Progress bar animation */}
        <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-full animate-progress-shrink" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress-shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-progress-shrink {
          animation: progress-shrink 3s linear forwards;
        }
      `}} />
    </div>
  );
};

export default Notification;
