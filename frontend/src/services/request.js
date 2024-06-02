function request(url, data = false, method = "GET") {
    
    return new Promise(async (resolve, reject) => {
        const user = localStorage.getItem("user")

        if(!user) throw new Error("Kullanıcı yok,token alınamıyor !")
        const parsedUser = JSON.parse(user)
        const token = parsedUser.accesToken
        
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }
        if (data && method === "POST") {
            options.body = JSON.stringify(data);
        }
        try {
            const response = await fetch(url, options);
            const result = await response.json();

            if (response.ok) {
                resolve(result);
            } else {
                reject(result);
            }
        } catch (error) {
            // Ağ hatası veya beklenmedik bir hata durumunda yakala
            reject({ message: 'Sunucu hatası !', error });
        }

    })
}

export const post = (url, data) => request(url, data, "POST")
export const get = (url)=>request(url)