import express from "express";
import { User } from "../models/UserModel.js";
import bcrypt from 'bcrypt';

const router = express.Router();


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
        console.log(user);
        return response.status(200).send(user); 
    }catch (error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});


export default router;