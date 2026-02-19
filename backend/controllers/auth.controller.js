import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

// Signup controller
export const signup = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields required"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            message:"Signup successful",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        });

    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

// Login Controller
export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        res.status(200).json({
            message:"Login Successful",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    } catch (error) {
        return res.status(500).json({message:"Server Error"});
    }
};