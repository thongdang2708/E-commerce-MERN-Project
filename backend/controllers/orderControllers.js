
const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

//@desc          Add Order
//@route         POST   /api/orders/
//@desc          Private

exports.placeOrder = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let {orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice} = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("There are no products in order. Cannot create an order!")
    };

    let createdOrder = await Order.create({
        user: user.id,
        orderItems,
        shippingAddress: shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    res.status(201).json(createdOrder);

});

//@desc          Get Single Order
//@route         GET /api/orders/:id
//@access        Private

exports.displaySingleOrder = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404)
        throw new Error("Order not found!")
    };

    if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
        res.status(401)
        throw new Error("Not authorized to access this route")
    };

    let singleOrder = await Order.findById(req.params.id).populate({
        path: "user",
        select: "name email"
    });

    res.status(200).json(singleOrder);

});



//desc         Get all orders for a single user
//@route       GET /api/orders/user/all
//@desc        Private

exports.getAllOrders = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let orders = await Order.find({user: req.user.id});

    res.status(200).json(orders);
});

//@desc     Update Payment
//@route    PUT  /api/orders/pay/:id
//@access   Private

exports.updatePayment = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404)
        throw new Error("Order not found!")
    };

    if (order.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authorized!")
    };

    let {id, status, update_time, payer} = req.body;

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: id,
        status: status,
        update_time: update_time,
        email_address: payer.email_address
    };
    
    await order.save({validateBeforeSave: false});
    
    let {orderItems} = order;
    
    orderItems.forEach(async (item) => {

        let product = await Product.findById(item.product);
    
        let minusStock = Number(product.countInStock) - Number(item.quantity);
    
        let updatedProduct = await Product.findByIdAndUpdate(item.product, 
            {
                countInStock: minusStock
            }, {
            new: true,
            runValidators: true
        });
    });
  

    
    res.status(200).json({
        message: "Paid successfully!"
    });


});

//@desc         Display an order list with an admin role
//@route        GET     /api/orders/admin/orderlist
//@private      Private

exports.displayOrdersByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let orders = await Order.find().populate("user");

    res.status(200).json(orders);


});

//@desc        Update to mark as delivered
//@route       PUT /api/orders/admin/markdeliver/:orderId
//@accesss     Private

exports.updateDeliverByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let order = await Order.findById(req.params.orderId);

    if (!order) {
        res.status(404)
        throw new Error("Order not found!")
    };

    let {isDelivered, deliveredAt} = req.body;

    let updateOrder = await Order.findByIdAndUpdate(req.params.orderId, 
        {
            isDelivered: isDelivered,
            deliveredAt: deliveredAt
        },
        {   
            new: true,
            runValidators: true
        });

    let savedOrder = await Order.findById(req.params.orderId);
    
    res.status(200).json(savedOrder);


});
