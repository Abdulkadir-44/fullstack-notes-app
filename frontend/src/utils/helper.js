export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const getInitials = (name) => {
    if (!name) {
        return "";
    }
    
    const words = name.split(" ");
    let initials = "";
   
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
        
    }

    return initials.toUpperCase();
}

export const convertToTurkishDate = (createdAt) => {
    const date = new Date(createdAt); // UNIX zaman damgasını JavaScript Date nesnesine dönüştür

    // Tarih formatını Türkiye'deki tarih formatına çevir
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formattedDate = date.toLocaleDateString('tr-TR', options);

    return formattedDate;
};

export const normalizeString = (str) => {
    return str
      .replace(/[\u0130]/g, 'i')   // İ => i
      .replace(/[\u0131]/g, 'i')   // ı => i
      .replace(/[\u015E]/g, 's')   // Ş => s
      .replace(/[\u015F]/g, 's')   // ş => s
      .replace(/[\u00C7]/g, 'c')   // Ç => c
      .replace(/[\u00E7]/g, 'c')   // ç => c
      .replace(/[\u00D6]/g, 'o')   // Ö => o
      .replace(/[\u00F6]/g, 'o')   // ö => o
      .replace(/[\u00DC]/g, 'u')   // Ü => u
      .replace(/[\u00FC]/g, 'u')   // ü => u
      .toLowerCase()
      .replace(/\s+/g, '');
  };