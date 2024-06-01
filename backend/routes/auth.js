const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const {tokenVerification} = require("../utils/tokenVerification")


//GET USER
router.get("/get-user", tokenVerification, async (req, res) => {
    try {
        const userId = req.user.userId || req.user._id
        const isUser = await User.findOne({ _id: userId })
        if (!isUser) return res.sendStatus(404)

        return res.status(201).json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdAt: isUser.createdAt
            },
        })

    } catch (error) {
        return res.status(404).json({
            error:true,
            message:"Bir hata oluştu !"
        })
    }
})

//CREATED ACCOUNT
router.post("/register", async (req, res) => {

    try {
        const { fullName, email, password } = req.body

        //kullanıcıdan gelen bilgiler eksik mi ?
        if (!fullName) return res.status(400).json({ message: "İsim ve Soyisim zorunlu !" })
        if (!email) return res.status(400).json({ message: "Mail zorunlu !" })
        if (!password) return res.status(400).json({ message: "Şifre zorunlu !" })
        //Bu kullanıcı sistemde kayıtlı ise izin
        const isUser = await User.findOne({ email: email })
        if (isUser) return res.status(400).json({ message: "Kullanıcı zaten kayıtlı !" })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        await newUser.save()
        //yeni hesap oluşturduktan sonra o hesaba ait token oluşturulur
        const accesToken = jwt.sign({ userId: newUser._id, fullName: fullName }, process.env.JWT_SECRET, { expiresIn: '2h' })

        return res.status(201).json({
            error: false,
            newUser,
            accesToken,
            message: "Kullanıcı hesabı oluşturuldu !"
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Bir hata oluştu !" })
    }

})

//LOGIN
router.post("/login", async (req, res) => {

    try {
        console.log(req.body);
        const { email, password } = req.body
        if (!email) return res.status(400).json({ message: "Email zorunlu !" })
        if (!password) return res.status(400).json({ message: "Şifre zorunlu !" })

        const userInfo = await User.findOne({ email: email })

        if (!userInfo) return res.status(400).json({ message: "Kullanıcı kayıtlı değil !" })

        const passwordMatch = await bcrypt.compare(password, userInfo.password)

        if (userInfo.email === email && passwordMatch) {
            const accesToken = jwt.sign({ userId: userInfo._id, email: userInfo.email }, process.env.JWT_SECRET, { expiresIn: "2h" })
            return res.json({
                error: false,
                message: "Giriş Başarılı",
                email,
                accesToken
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Bir hata oluştu !" })
    }
})

module.exports = router