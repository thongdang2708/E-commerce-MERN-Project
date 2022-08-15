
const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Product = require("../models/productModel");

//@desc           Add comment
//@route          POST  /api/products/:productId/reviews
//@access         Private

exports.addComment = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let {rating, comment, name} = req.body;

    if (!rating || !comment || !name) {
        res.status(400)
        throw new Error("Please fill information!")
    };

    let product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404)
        throw new Error("Product not found!")
    };

    let createdReview = await Review.create({
        product: product._id,
        user: user._id,
        name,
        rating,
        comment
    });

    res.status(201).json(createdReview);

});

//@desc           Get comments of a product
//@route          GET    /api/products/:productId/reviews
//@access         Private

exports.getComments = asyncHandler(async (req, res, next) => {


    let product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    };

    let reviews = await Review.find({product: product._id});

    res.status(200).json(reviews);

});
