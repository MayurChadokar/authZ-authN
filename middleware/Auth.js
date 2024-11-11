const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookies=require("cookie-parser");

exports.auth = (req, res, next) => {
    try {
        // Extract JWT token from request body, headers, or query parameters
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer "," ");
         console.log("the token from req body token ", req.body.token);
         console.log("the token from req body token",req.cookies.token);
         console.log("header token",req.header("Authorizaton"));

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is not available"
            });
        }

        console.log("Verifying JWT token...");

        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);//payload decode kr deta hai token mein se 
            console.log(decoded);//

        // name:
        // email:
        // 
            req.user = decoded; // Store decoded data in request object
        }catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        next(); // Proceed to next middleware
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false, 
            message: 'Something went wrong',
        });
    }
};

exports.isStudent = (req, res, next) => {
    try {
        // Check if user's role is "student"
        if (req.user.role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Access restricted to students only",
            });
        }
        next(); // User is a student, proceed to the next middleware
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User role not defined',
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status()
                .json({
                    success: false,
                    message: "its for the only the admin panel"
                });
        }
        next();

    }
    catch (error) {
  return res.status(500).json({
    success:false,
    message:"kuch to ho rha hau",
  });
    }
}
