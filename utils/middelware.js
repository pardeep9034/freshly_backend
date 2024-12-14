const jwt = require("jsonwebtoken");


// Middleware to check if the user is authentica 
const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    
    // If token doesn't exist
    if (!token) {
        return res.status(401).send({ message: "You need to login" });
    }
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Add user ID to the request object
        next();
    } catch (error) {
        console.error("Error during token verification:", error);
        // If token is invalid or expired or any other error
        return res.status(403).send({ message: "Invalid token or expired" });
        
        
    }
    }
    module.exports = { verifyuser };