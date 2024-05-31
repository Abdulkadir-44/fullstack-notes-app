require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const authRouter = require("./routes/auth")
const notesRouter = require("./routes/notes")

const PORT = 3000;

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "*"
    })
)
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Veritabanı bağlantısı başarılı");
}).catch(error => {
    console.log("Hata var : ", error);
})

app.use("/api/auth", authRouter)
app.use("/api/notes",notesRouter)

// app.get("/", (req, res) => {
//     res.send("Merhaba Dünya")
// })



app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda ayağa kaldırıldı...`);
})