const jwt = require("jsonwebtoken")

const tokenVerification = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) return res.status(401).json({message : "Unauthorized: Missing token"})

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err)
            return res.status(403).json({message : "Forbidden: Invalid token"})
        // eğer herşey tamam ise req altına yeni bir key ve value değeri ekliyoruz bu key user value ise token içindeki değerler
        req.user = decoded
        next()
    })
}

module.exports = {tokenVerification}