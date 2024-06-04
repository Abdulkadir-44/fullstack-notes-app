const express = require("express")
const router = express.Router()
const { tokenVerification } = require("../utils/tokenVerification")
const Note = require("../models/note")



//ADD NOTE
router.post("/add-note", tokenVerification, async (req, res) => {
    try {
        const { title, content, tags } = req.body
        const userId = req.user.userId || req.user._id

        if (!title || !content)
            return res.status(400).json({ message: "İçerik veya Başlık zorunlu" })

        const newNote = new Note({
            title, content, tags: tags || [], user: userId
        })
        const savedNote = await newNote.save()
        return res.status(201).json({
            error: false,
            savedNote,
            message: "Not kaydedildi !"
        })
    } catch (error) {
        return res.status(404).json({
            error: true,
            message: "Bir hata oluştu"
        })
    }
})

//DELETE NOTE
router.delete("/delete-note/:id", tokenVerification, async (req, res) => {
    try {
        const noteId = req.params.id
        const userId = req.user.userId || req.user._id
        const note = await Note.findOne({ user: userId, _id: noteId })
        if (!note) return res.status(400).json({ message: "Not bulunamadı !" })
        await Note.deleteOne({ _id: noteId })
        return res.status(201).json({ error: false, message: "Not başarıyla silindi !" })
    } catch (error) {
        return res.status(404).json({
            error: true,
            message: "Bir hata oluştu !"
        })
    }
})

//GET ALL NOTES
router.get("/get-all-notes", tokenVerification, async (req, res) => {
    try {
        
        const userId = req.user.userId || req.user._id

        const notes = await Note.find({ user: userId }).sort({ createdAt: -1 })

        return res.status(201).json({
            error: false,
            notes,
            message: "Başarılı !"
        })
    } catch (error) {
        return res.status(404).json({
            error: true,
            message: "Bir hata oluştu !"
        })
    }
})

//EDIT NOTE
router.put("/edit-note/:id", tokenVerification, async (req, res) => {
    try {
        const { title, content, tags } = req.body
        const noteId = req.params.id
        const userId = req.user.userId || req.user._id
        const note = await Note.findOne({ user: userId, _id: noteId })
        if (!note) return res.status(400).json({ message: "Not bulunamadı !" })

        if (title) note.title = title
        if (content) note.content = content
        if (tags) note.tags = tags

        await note.save()
        return res.status(201).json({
            error: false,
            note,
            message: "Not başarıyla güncellendi !"
        })

    } catch (error) {
        return res.status(404).json({
            error: true,
            message: "Bir hata oluştu !"
        })
    }
})

module.exports = router
