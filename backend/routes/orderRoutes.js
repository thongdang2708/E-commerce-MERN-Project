
const express = require("express");

const {protect, checkUser, checkAdmin} = require("../middleware/auth");

const {placeOrder, displaySingleOrder, getAllOrders, updatePayment, displayOrdersByAdmin, updateDeliverByAdmin} = require("../controllers/orderControllers");

const router = express.Router();


router.route("/admin/markdeliver/:orderId").put(protect, checkAdmin, updateDeliverByAdmin);
router.route("/").post(protect, checkUser, placeOrder);
router.route("/user/all").get(protect, checkUser, getAllOrders);
router.route("/admin/orderlist").get(protect, checkAdmin, displayOrdersByAdmin);
router.route("/pay/:id").put(protect, checkUser, updatePayment);
router.route("/:id").get(protect, displaySingleOrder);


module.exports = router;