import jsPDF from 'jspdf';

/**
 * Generates a SELECTABLE and SEARCHABLE PDF from a DOM element.
 * Uses the modern jsPDF.html() method to preserve text objects.
 * @param {HTMLElement} element - The DOM element to convert to PDF.
 * @param {string} filename - The name of the downloaded file.
 */
export const downloadPdf = async (element, filename = 'resume.pdf') => {
  if (!element) {
    throw new Error('No element provided for PDF generation');
  }

  // Configuration for jsPDF and the HTML renderer
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pdfWidth = doc.internal.pageSize.getWidth();
  const elementWidth = element.offsetWidth || 800;

  const options = {
    callback: function (doc) {
      doc.save(filename);
    },
    x: 0,
    y: 0,
    width: pdfWidth, // target width in the PDF
    windowWidth: elementWidth, // actual width of the element in the browser for scaling
    autoPaging: 'text', // ensure text items are kept together when possible
    margin: [20, 20, 20, 20], // Add standard print margins
    html2canvas: {
      useCORS: true,
      letterRendering: true,
      logging: false,
      scale: 1 // Lower scale for html2canvas as we want text objects, not high-res image
    }
  };

  try {
    // Renders HTML as text and images into the PDF
    await doc.html(element, options);
  } catch (error) {
    console.error('Selectable PDF Generation failed:', error);
    throw error;
  }
};
