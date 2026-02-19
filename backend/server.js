import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import connectDB from './config/db.js';


dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin:"*",
    credentials:true
}));
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.get("/",(req,res)=>{
    res.send("Backend is running");
})
app.use("/api/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})