
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});


ReviewSchema.statics.getRating = async function (productId) {

    let obj = await this.aggregate([
        {
            $match: {product: productId}
        },
        {
            $group: {
                _id: "$product",
                averageRating: {$avg: "$rating"}
            }
        }
    ]);

    try {

        let product = await this.model("Product").findById(productId);

        await this.model("Product").findByIdAndUpdate(productId, {
            rating: Number(obj[0].averageRating),
            numReviews: Number(product.numReviews) + 1
        });


    } catch (err) {
        console.error(err);
    }
};


ReviewSchema.post("save", function () {

    this.constructor.getRating(this.product);
});

ReviewSchema.pre("remove", function () {
    this.constructor.getRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);