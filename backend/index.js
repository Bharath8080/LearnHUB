const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('uploads')); // Serve uploaded files

// Placeholder routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', require('./routers/userRoutes'));
app.use('/api/courses', require('./routers/courseRoutes'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
