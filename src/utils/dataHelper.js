export const processTextFormatting = (text) => {
  if (typeof text !== 'string') return text;
  // This regex finds content wrapped in ** and replaces it with <strong> tags
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};


export const getISTFormatDate=(value)=>{
  const gmtDate = new Date(value);
  const istDateStr = gmtDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: false
    
});
return istDateStr
}
