const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
},{timestamps:true})

module.exports = mongoose.model('Note', NoteSchema)

//Şemamıza user kısmında bir bölüm ekledik çünkü herkes kendi notlarını görcek veya işlem yapcak bundan dolayı ilşkilendirdik,export ederken ilk parametre isimdir yani require ederken require("./models/Note") şeklinde olcak