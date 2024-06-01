function request(url, data = false, method = "GET") {

    return new Promise(async (resolve, reject) => {
        const options = {
            method
        }

        if (data && method === "POST") {
            options.body = JSON.stringify(data)
            options.headers = {
                "Content-Type": "application/json"
            }
        }
        
        const response = await fetch(url, options)
        const result = await response.json()

        if (response.ok) {
            resolve(result)
        } else {
            reject(result)
        }

    })
}

export const post = (url, data) => request(url, data, "POST")