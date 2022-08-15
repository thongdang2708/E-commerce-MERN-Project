
const express = require("express");

const {register, login, displaySingleUser, getMe, updateUserDetails, updatePassword, displayAllUsers, getSingleUserByAdmin, updateUserByAdmin, deleteUserByAdmin} = require("../controllers/authControllers");

const {protect, checkAdmin} = require("../middleware/auth");

const router = express.Router();

router.route("/").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/details").get(protect, displaySingleUser);
router.route("/update").put(protect, updateUserDetails);
router.route("/updatepassword").post(protect, updatePassword);
router.route("/allusers").get(protect, checkAdmin, displayAllUsers);
router.route("/singleuser/:userId").get(protect, checkAdmin, getSingleUserByAdmin).put(protect, checkAdmin, updateUserByAdmin).delete(protect, checkAdmin, deleteUserByAdmin);
 
module.exports = router;