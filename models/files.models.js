const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    path:{
        type:String,
        required:[true,'Path is required']
    },
    originalname :{
        type:String,
        required:[true,'Original name is required']
    }
})
const file = mongoose.model('file',fileSchema)
module.exports = file;