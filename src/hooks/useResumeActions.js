import { useCallback } from 'react';
import { useNotification } from '../context/NotificationContext';

export const useResumeActions = (resumeData, setResumeData) => {
  const { showNotification } = useNotification();

  const handleExportJSON = useCallback(() => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    const fileName = resumeData.fullName 
      ? `${resumeData.fullName.replace(/\s+/g, '_')}_Resume_Backup` 
      : `resume-snapshot-${date}`;
    
    link.href = url;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification("Resume snapshot exported successfully!", "success");
  }, [resumeData, showNotification]);

  const handleImportJSON = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setResumeData(json);
        showNotification("Resume snapshot imported successfully!", "success");
      } catch (err) {
        showNotification("Invalid JSON snapshot file.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = null; // Reset for same-file re-imports
  }, [setResumeData, showNotification]);

  const handlePrint = useCallback((onBeforePrint) => {
    if (onBeforePrint) {
      onBeforePrint();
    } else {
      window.print();
    }
  }, []);

  return {
    handleExportJSON,
    handleImportJSON,
    handlePrint
  };
};
