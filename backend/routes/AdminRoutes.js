import express from "express";
import { User } from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config.js";

const router = express.Router();

// Admin login Method
router.post('/login',async (request, response)=>{
    try{
        const {username, password} = request.body;
        const admin = await User.findOne({username, role: 'admin'});
        if (!admin){
            return response.status(404).send({message: 'Admin not found'});
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch){
            return response.status(401).send({message: 'Invalid Credentials'});
        }
        const payload = {
            id: admin._id,
            username: admin.username,
        };
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
        console.log('Admin has logged in!');
        return response.status(200).send({token});
    }catch (error){
        console.log(error.message);
        return response.status(500).send({message: 'Internal Server Error'});
    }
});

export default router;