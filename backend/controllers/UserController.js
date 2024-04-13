import { User } from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config.js";

// Function to handle user registration
export const registerUser = async (request, response) => {
    try {
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
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
};

// Function to handle user login
export const loginUser = async (request, response) => {
    try {
        const { username, password } = request.body;
        const user = await User.findOne({username});
        if (!user || user.role === 'admin') {
            // If no user found, return a 404 Not Found response
            return response.status(404).send({ message: 'User not found' });
        }
        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return response.status(401).send({ message: 'Invalid password' });
        }
        console.log('passwords matched');
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        console.log(user);
        return response.status(200).send({token}); 
    } catch (error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
};

// Function to handle user profile retrieval
export const getUserProfile = async (request, response) => {
    try {
        if (request.user.role === 'admin') {
            return response.status(403).send({ message: 'Access forbidden for admin users' });
        }
        // Retrieve user information (authentication middleware stores user ID on request.user)
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
};
