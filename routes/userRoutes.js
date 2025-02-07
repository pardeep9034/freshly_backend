const express = require("express");
const router = express.Router();
const { userModel,managerModel } = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const environment = process.env.ENVIROMENT; // development

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    // console.error("Error getting users:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

//add user by manager
router.post("/add", async (req, res) => {
  const {username, phoneno, password, role, isActive, addedBy } = req.body;

  try {
    // Create a new user
    const user = await userModel.create({
      username,
      phoneno,
      password,
      role,
      isActive,
      addedBy,
    });

    res.status(201).send({ message: "User added successfully", user });
  } catch (error) {
    // console.error("Error adding user:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});


// Employee Login
router.post("/employee/login", async (req, res) => {
  const { phoneno, password } = req.body;
  // console.log("password", password);

  try {
    // Find the user by phone number
    const user = await userModel.findOne({ phoneno });
    // console.log("user", user);

    // If user doesn't exist
    if (!user) {
      return res.status(401).send({ message: "Invalid phone number or password" });
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(401).send({ message: "Invalid phone number or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 24 hours
    });

    // Send the token in a secure HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, 
      secure:environment === 'production' ? true : false || false, 
      sameSite:environment === 'production' ? 'none' : "lax" || "lax"});
    res.status(200).send({  message: "Login successful" ,user});
  } catch (error) {
    // console.error("Error during login:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});
router.get('/logout', async (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Logged out successfully' });
});
//authenticating the user

router.get('/authenticate', async (req, res) => {
  const token = req.cookies.token; // Extract token from cookies
  if (!token) {
      return res.status(401).send({ message: 'Unauthenticated' }); // No token provided
  }

  try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the user exists
      const user = await userModel.findById(decoded.userId).select('-password');

      // Check if the manager exists (if user is null)
      const manager = user ? null : await managerModel.findById(decoded.userId).select('-password');

      // If neither exists, return unauthenticated
      if (!user && !manager) {
          return res.status(401).send({ message: 'Unauthenticated' });
      }

      // Respond with the user or manager data
      res.send(user || manager);
  } catch (error) {
      // console.error('Error during authentication:', error);
      res.status(403).send({ message: 'Invalid token' }); // Invalid or expired token
  }
});

// Manager Login
router.post("/manager/login", async (req, res) => {
  const { phoneno, password } = req.body;

  try {
    // Find the manager by username
    const manager = await managerModel.findOne({ phoneno });

    // If manager doesn't exist
    if (!manager) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    // Compare the provided password with the stored password
    if (password !== manager.password) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: manager._id }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 24 hours
    });

    // Send the token in a secure HTTP-only cookie
    res.cookie("token", token,
       { httpOnly: true ,
        secure: environment === 'production' ? true : false || false,
        sameSite: environment === 'production' ? 'none' : "lax" || "lax" ,
        
       });
    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    // console.error("Error during login:", error);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});




module.exports = router;
