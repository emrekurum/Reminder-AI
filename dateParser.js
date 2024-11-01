// dateParser.js

export const parseDate = (input) => {
    const date = new Date();
  
    // Günleri kontrol et
    const dayMatch = input.match(/(\d+)\s*?(gün|güne)/);
    if (dayMatch) {
      const days = parseInt(dayMatch[1], 10);
      date.setDate(date.getDate() + days);
    }
  
    // Haftaları kontrol et
    const weekMatch = input.match(/(\d+)\s*?(hafta|haftaya)/);
    if (weekMatch) {
      const weeks = parseInt(weekMatch[1], 10);
      date.setDate(date.getDate() + weeks * 7);
    }
  
    // Ayları kontrol et
    const monthMatch = input.match(/(\d+)\s*?(ay|aya)/);
    if (monthMatch) {
      const months = parseInt(monthMatch[1], 10);
      date.setMonth(date.getMonth() + months);
    }
  
    // Saatleri kontrol et
    const hourMatch = input.match(/(\d+)\s*?(saat|saate|saat sonra|saate sonra)/);
    if (hourMatch) {
      const hours = parseInt(hourMatch[1], 10);
      date.setHours(date.getHours() + hours);
    }
  
    // Dakikaları kontrol et
    const minuteMatch = input.match(/(\d+)\s*?(dakika|dakikaya|dakika sonra|dakikaya sonra)/);
    if (minuteMatch) {
      const minutes = parseInt(minuteMatch[1], 10);
      date.setMinutes(date.getMinutes() + minutes);
    }
  
    return date > new Date() ? date : null; // Geçersiz tarihler için null döndür
  };
  