
const express = require("express");

const {getProducts, addProduct, getSingleProduct, displayProductListByAmin, addProductByAdmin, getSingleProductByAdmin, updateSingleProductByAdmin, deleteProductByAdmin} = require("../controllers/productControllers");

const {protect, checkAdmin} = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const reviewRoute = require("./reviewRoutes");
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, "public/uploads"))
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const checkFile = function (req, file, cb) {
    
    let testTypes = /jpg|jpeg|png/;
    let extname = testTypes.test(path.extname(file.originalname).toLowerCase());
    let mimetype = testTypes.test(file.mimetype);
    let fileSize = parseInt(req.headers["content-length"]);

    if (extname && mimetype && fileSize < process.env.FILE_SIZE) {
        return cb(null, true)
    } else {
        cb(new Error("Please upload file again!"))
    }
};

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFile(req, file, cb)
    }
});

router.use("/:productId/reviews", reviewRoute);
router.route("/").get(getProducts).post(addProduct);
router.route("/admin/productlist").get(protect, checkAdmin, displayProductListByAmin).post(protect, checkAdmin, upload.single("image"), addProductByAdmin);

router.route("/admin/singleproduct/:productId").get(protect, checkAdmin, getSingleProductByAdmin).put(protect, checkAdmin, upload.single("image"), updateSingleProductByAdmin).delete(protect, checkAdmin, deleteProductByAdmin);
router.route("/:id").get(getSingleProduct);

module.exports = router;