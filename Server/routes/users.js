const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
})

module.exports = mongoose.model('User', userSchema)