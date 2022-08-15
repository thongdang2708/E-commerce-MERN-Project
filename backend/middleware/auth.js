
let asyncHandler = require("express-async-handler");
let User = require("../models/userModel");
let jwt = require("jsonwebtoken");

//Protect middleware

exports.protect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            token = req.headers.authorization.split(" ")[1];

            let decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (err) {
            console.error(error);
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

});


//Middleware to check admin

exports.checkAdmin = (req, res, next) => {

    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401)
        throw new Error("Not authorized!")
    };

};







//Middleware to check whether person is a user

exports.checkUser = (req, res, next) => {

    if (req.user && !req.user.isAdmin) {
        next();
    } else {
        res.status(401)
        throw new Error("This user is admin. Not authorized to add comment")
    }
};











