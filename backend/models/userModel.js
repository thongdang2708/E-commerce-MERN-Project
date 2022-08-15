
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Order = require("../models/orderModel");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

}, 
{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    };

    let salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();

});

UserSchema.pre("remove", async function () {

    let result = await this.model("Order").deleteMany({user: this._id});


});

UserSchema.virtual("order", {
    ref: "Order",
    localField: "_id",
    foreignField: "user",
    justOne: false
});



module.exports = mongoose.model("User", UserSchema);







