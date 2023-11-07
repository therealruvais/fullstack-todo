const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    // name: String,
    name:{
        type:String,
        required:[true,'provide a valid string'],
        trim:true,
        maxlength:[20,'provide only less than 20 string']
    },
    completed:{
        type:Boolean,
        default:false,
    }
})

module.exports = mongoose.model('Task', TaskSchema)