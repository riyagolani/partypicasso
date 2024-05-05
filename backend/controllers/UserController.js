import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// Function to handle user registration
export const registerUser = async (request, response) => {
  try {
    const { username, password, email, contact, role } = request.body;

    if (!username || !password || !email || !contact || !role) {
      return response.status(400).send({
        message: "Please enter the required fields.",
      });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return response.status(400).send({
        message: "Username already exists",
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
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Function to handle user login
export const loginUser = async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });
    if (!user || user.role === "admin") {
      // If no user found, return a 404 Not Found response
      return response.status(404).send({ message: "User not found" });
    }
    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return response.status(401).send({ message: "Invalid password" });
    }
    console.log("passwords matched");
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    const Generatedtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    console.log(user);
    //return response.status(200).send({ token });
    return response.status(200).send({
      _id: user._id,
      username: user.username,
      password: user.password,
      email: user.email,
      contact: user.contact,
      role: user.role,
      token: Generatedtoken,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
};

// Function to handle user profile retrieval
export const getUserProfile = async (request, response) => {
  try {
    const { editUser } = request.body;
    console.log(editUser);
    if (request.user.role === "admin") {
      return response
        .status(403)
        .send({ message: "Access forbidden for admin users" });
    }
    // Retrieve user information (authentication middleware stores user ID on request.user)
    const user = await User.findById(request.user.id);

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }
    console.log(editUser.username);
    console.log("User found");
    // Optionally filter sensitive information before sending response
    // const profileData = {
    //   username: user.username,
    //   email: user.email,
    //   contact: user.contact,
    // };
    const updateDocument = {
      $set: {
        username: editUser.username,
        email: editUser.email,
        contact: editUser.contact,
      },
    };

    if (editUser.newPassword) {
      const hashedPassword = await bcrypt.hash(editUser.newPassword, 10);
      updateDocument.$set.password = hashedPassword;
    }

    console.log("Fetching user profile data");
    const insertedUser = await User.findOneAndUpdate(
      { _id: request.user.id },
      updateDocument,
      {
        new: true,
      }
    );
    console.log(insertedUser);
    response.status(200).json(insertedUser);
  } catch (err) {
    console.log(err);
  }
};
//     return response.status(200).send(profileData);
//   } catch (error) {
//     console.log(error.message);
//     return response.status(500).send({ message: error.message });
//   }
// };

//   try {

//       const query = { user_id: editUser.user_id }
