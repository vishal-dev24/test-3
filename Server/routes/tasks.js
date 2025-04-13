const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    task: String,
    term: String,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }    
})

module.exports = mongoose.model('Task', taskSchema)