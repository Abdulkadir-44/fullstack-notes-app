function request(url, data = false, method = "GET") {

    return new Promise(async (resolve, reject) => {
        //login olurken token olmayacaktır bundan dolayı header kısmını ayarlamam gerekir default olarak headers kısmında sadece content-type var ama kullanıcı varsa token ile göndermem lazım bundan dolayı headers kısmına tokeni ekliyorum
        const parsedUser = localStorage.getItem("user") && JSON.parse(localStorage.getItem('user'))

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        }

        if (parsedUser) {
            const token = parsedUser.accesToken
            options.headers.Authorization = `Bearer ${token}`;
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
export const get = (url) => request(url)