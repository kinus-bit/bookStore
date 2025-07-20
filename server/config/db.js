const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        await mongoose.connect( MONGO_URI);
        console.log('MongoDB connected successfully!!!');   
    } catch (error) {
        console.error('MongoDB connection failed:',error.message) 
    }
   
}