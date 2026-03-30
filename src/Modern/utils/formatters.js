/**
 * Enhanced markdown formatter for Modern Resumes.
 * Supports:
 * - **Bold**
 * - *Italics*
 * - __Underline__
 * - [Links](url)
 * - Auto-highlighting metrics (e.g. 40%, $500k)
 * - Auto-linking emails and web addresses
 */
export const formatMarkdown = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  let formatted = text
    // Escaping to prevent HTML injection while allowing our tags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 800; color: inherit;">$1</strong>')
    
    // Italics: *text* or _text_ (excluding __ for underline)
    .replace(/(?<!_)\*(.*?)\*(?!\*)/g, '<em style="font-style: italic; opacity: 0.9;">$1</em>')
    .replace(/(?<!_)\b_(.*?)_\b/g, '<em style="font-style: italic; opacity: 0.9;">$1</em>')
    
    // Underline: __text__
    .replace(/__(.*?)__/g, '<u style="text-decoration-thickness: 1px; text-underline-offset: 2px;">$1</u>')
    
    // Links: [text](url)
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline; opacity: 0.8;">$1</a>')
    
    // Auto-highlight metrics: 40%, $500k, 5+ years (Common in resumes)
    .replace(/(\d+%|\$\d+(?:\.\d+)?(?:k|m|b)?|\d+\+?\s+years)/gi, '<span style="font-weight: 700; background-color: rgba(0,0,0,0.03); padding: 0 2px; border-radius: 2px;">$1</span>')
    
    // Newlines
    .replace(/\n/g, '<br/>');

  return formatted;
};
