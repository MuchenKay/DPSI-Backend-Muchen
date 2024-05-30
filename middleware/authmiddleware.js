// authmiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const isAuthenticated = (req, res, next) => {
  try {
    // Check if token is present in Authorization header
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    } else {
      // If token is not present in Authorization header, check the cookie
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decoded = jwt.verify(token, "muchenbackend");
    req.user = decoded.user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const isOwner = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from the Authorization header
    const decoded = jwt.verify(token, "muchenbackend"); // Verify the token using the secret key

    // Find the user in the database based on the decoded username
    const user = await User.findOne({ username: decoded.user });

    // Check if the user is an owner
    if (!user || !user.isOwner) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    next(); // Move to the next middleware
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { isAuthenticated, isOwner };
