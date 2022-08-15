
const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({

    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Product", ProductSchema);





