import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import connectDB from './config/db.js';


dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})