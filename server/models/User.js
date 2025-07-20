const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type:String , required: true , unique: true},
    email: {type: String , required: true , unique: true},
    pasword: {type: String , required: true},
    role: {type: String ,enum: ['Admin','student'] ,default:'student'}
});

module.exports = mongoose.model('Users',userSchema);