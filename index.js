import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config(); // To access environment variables
connectDB();

const app = express(); // Creates the instance of the express application

app.use(express.json()); // To parse json data from the request body

// Mount your routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { // Starts the server
    console.log(`Server is running on port ${PORT}`);
});