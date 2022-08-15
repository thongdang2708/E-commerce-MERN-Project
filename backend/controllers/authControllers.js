
let User = require("../models/userModel");
let asyncHandler = require("express-async-handler");
let Product = require("../models/productModel");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
//@desc    Register
//@route   POST  /api/users/
//@access  Public

exports.register = asyncHandler(async (req, res, next) => {

    let {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill information");
    };

    let existUser = await User.findOne({email: email});

    if (existUser) {
        res.status(400)
        throw new Error("User exists already!")
    };


    let createdUser = await User.create({
        name,
        email,
        password
    });

    if (createdUser) {
        res.status(201).json({
            name: createdUser.name,
            email: createdUser.email,
            token: generateToken(createdUser._id)
        })
    } else {
        res.status(400)
        throw new Error("Unvalid User Data")
    }

    
});

//@desc          Log In
//@route         POST /api/users/login
//@access        Public

exports.login = asyncHandler(async (req, res, next) => {

    let {email, password} = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill information!")
    };

    let user = await User.findOne({email: email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isAdmin: user.isAdmin,
            id: user._id
        });
    } else {
        res.status(401)
        throw new Error("Invalid Credentials!")
    }


});


//@desc            Display Single User's Details
//@route           GET     /api/users/details/
//@acesss          Private

exports.displaySingleUser = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id).select("-password");

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    res.status(200).json(user);

});

//@desc         Update user details
//@route        PUT   /api/users/update/
//@access       Private

exports.updateUserDetails = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(updateUser);

});

//@desc        Update password
//@route       POST    /api/users/updatepassword/
//@access      Private

exports.updatePassword = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let {currentPassword, newPassword} = req.body;

    if (!currentPassword || !newPassword) {
        res.status(400)
        throw new Error("Please fill information!")
    };

    let isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
        res.status(401)
        throw new Error("Password does not match!")
    };

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    res.status(200).json({
        message: "Update password successfully!"
    });


});

//@desc         Get Me (test only);
//@route        GET    /api/users/me/
//@access       Private

exports.getMe = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id).select("-password");

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    res.status(200).json(user);


});

//@desc         Display all users with an admin role
//@route        GET    /api/users/allusers
//@access       Private
exports.displayAllUsers = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let users = await User.find();

    res.status(200).json(users);


});

//@desc       Get single user with an admin role
//@route      GET  /api/users/singleuser/:userId
//@access     Private

exports.getSingleUserByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let singleuser = await User.findById(req.params.userId).select("-password");

    if (!singleuser) {
        res.status(404)
        throw new Error("User not found!")
    };

    res.status(200).json(singleuser);

});

//@desc     Update a single user with an admin role
//@route    PUT    /api/users/singleuser/:userId
//@desc     Private

exports.updateUserByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let singleUser = await User.findById(req.params.userId);

    if (!singleUser) {
        res.status(401)
        throw new Error("User not found!")
    };

    let {name, email, isAdmin} = req.body;

    if (!name || !email) {
        res.status(400)
        throw new Error("Please fill information!")
    };

    let updateSingleUser = await User.findByIdAndUpdate(req.params.userId, 
    {
        name,
        email,
        isAdmin
    },
    {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        message: "Update user successfully!"
    });


});

//@desc     Delete a single user with an admin role
//@route    PUT    /api/users/singleuser/:userId
//@desc     Private

exports.deleteUserByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let singleuser = await User.findById(req.params.userId).populate("order").select("-password");


    if (!singleuser) {
        res.status(404)
        throw new Error("User not found!")
    };

    let allorders = singleuser.order.map((order) => ({
        orderItems: order.orderItems,
        isPaid: order.isPaid
    }));

    allorders.forEach((order) => {
        if (order.isPaid) {
            order.orderItems.forEach(async (orderitem) => {
                let product = await Product.findById(orderitem.product);
                let backStock;
                backStock = Number(product.countInStock) + Number(orderitem.quantity);

                await Product.findByIdAndUpdate(orderitem.product, {
                    countInStock: Number(backStock)
                },
                {
                    new: true,
                    runValidators: true
                })
            }); 
        }
    });

    await singleuser.remove();


    res.status(200).json({
        singleuser
    });
});

//Function to generate token

const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};


