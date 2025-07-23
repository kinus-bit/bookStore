const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type:String , required: true , unique: true},
    email: {type: String , required: true , unique: true},
    password: {type: String , required: true},
    role: {type: String ,enum: ['Admin','developer'] ,default:'developer'},
    status: { type: String, default: 'active', enum: ['active', 'inactive'] },
    joinDate: { type: String },
    lastLogin: { type: String }
});

module.exports = mongoose.model('Users',userSchema);