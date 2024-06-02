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
