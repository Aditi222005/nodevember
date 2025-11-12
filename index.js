import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.route.js';
import orderRoutes from './routes/order.routes.js';
import aiRoutes from './routes/ai.routes.js';
dotenv.config(); // To access environment variables
connectDB();

const app = express(); // Creates the instance of the express application

app.use(express.json()); // To parse json data from the request body

// Mount your routes
app.use('/api/auth', authRoutes);
app.use('/api/books',bookRoutes)
app.use('/api/orders', orderRoutes);
app.use('/api/ai', aiRoutes);
// This route handler will respond to GET requests at the root URL
app.get('/', (req, res) => {
  res.send('deployment successful');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { // Starts the server
    console.log(`Server is running on port ${PORT}`);
});
export default app;