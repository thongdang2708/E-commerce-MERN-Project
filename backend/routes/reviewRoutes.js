
const express = require("express");

const {addComment, getComments} = require("../controllers/reviewControllers");
const {protect, checkUser} = require("../middleware/auth");

const router = express.Router({mergeParams: true});

router.route("/").get(getComments).post(protect, checkUser, addComment);

module.exports = router;