import express from "express";
import { User } from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = crypto.randomBytes(64).toString('hex');

// Create User POST Method
router.post('/',async (request, response)=>{
    try{
        const { username, password, email, contact, role } = request.body;

        if (!username || !password || !email || !contact || !role){
            return response.status(400).send({
                message: 'Please enter the required fields.'
            });
        }
        
        // Check if username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return response.status(400).send({
                message: 'Username already exists'
            });
        }

        const newUser = {
            username: username,
            password: password,
            email: email,
            contact: contact,
            role: role,
        };

        const user = await User.create(newUser);
        return response.status(201).send(user);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


// Authentication Middleware
function authenticate(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).send({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        request.user = { id: decoded.id };
        next(); 
    } catch (error) {
        return response.status(401).send({ message: 'Invalid token' }); 
    }
}


// User Login using username and password
router.post('/login', async (request, response) => {
    try{
        const { username, password } = request.body;
        const user = await User.findOne({username});
        if (!user) {
            // If no user found, return a 404 Not Found response
            return response.status(404).send({ message: 'User not found' });
        }
        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return response.status(401).send({ message: 'Invalid password' });
        }
        const payload = {
            id: user.id,
            username: user.username,
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        console.log(user);
        return response.status(200).send({token}); 
    }catch (error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});


// User Login using username and password
router.get('/profile', authenticate, async (request, response) => {
    try {
        // Retrieve user information (assume authentication middleware stores user ID on request.user)
        const user = await User.findById(request.user.id);

        if (!user) {
            return response.status(404).send({ message: 'User not found' });
        }
        console.log("User found");
        // Optionally filter sensitive information before sending response
        const profileData = {
            username: user.username,
            email: user.email,
            contact: user.contact,
        };
        console.log("Fetching user profile data");
        return response.status(200).send(profileData); 
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});

export default router;