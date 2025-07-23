const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const { connectDB }= require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use( '/api/books' , bookRoutes);
app.use( '/api/auth' , authRoutes );
app.use('/api/users', userRoutes);;

app.get('/', (req, res) => {
    res.send('Hello World');
});

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => 
    console.log(`Server is running on http://localhost:${PORT}`)
);
