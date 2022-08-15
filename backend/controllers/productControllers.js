
let asyncHandler = require("express-async-handler");
let Product = require("../models/productModel");
let User = require("../models/userModel");
//@desc            GET ALL PRODUCTS
//@route           GET    /api/products/
//@access          PUBLIC


exports.getProducts = asyncHandler(async (req, res, next) => {

    let products = await Product.find();

    res.status(200).json(products);
});

//@desc         Add Product
//@route        POST    /api/products/
//@access       PUBLIC

exports.addProduct = asyncHandler(async (req, res, next) => {


    let {name, image, description, brand, category, price, countInStock, rating, numReviews} = req.body;

    let imageURL = `${req.protocol}://${req.get("host")}/uploads/${image}`;

    let product = await Product.create({
        name,
        image: imageURL,
        description,
        brand,
        category,
        price,
        countInStock,
        rating,
        numReviews
    });

    res.status(201).json({
        success: true
    });



});

//@desc         Get single product
//@route        GET    /api/products/:id
//@access       Private

exports.getSingleProduct = asyncHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404)
        throw new Error("Product not found!")
    };

    res.status(200).json(product);
    
    
});

//@desc        Display a product list with an admin role
//@route       GET      /api/products/admin/productlist
//@access      Private

exports.displayProductListByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

   
});

//@desc       Display a product list with an admin role
//@route      GET      /api/products/admin/productlist
//@access     Private

exports.displayProductListByAmin = asyncHandler(async(req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!");
    };

    let products = await Product.find();

    res.status(200).json(products);

});

//@desc        Add a product with an admin role
//@route       POST    /api/products/admin/productlist
//@access      Private

exports.addProductByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let body = JSON.parse(req.body.body);

    let {name, price, brand, countInStock, category, description} = body;

    if (!name || Number(price) === 0 || !brand || Number(countInStock) === 0 || !category || !description) {
        res.status(400)
        throw new Error("Please fill in information!")
    };

    if (req.file === undefined || req.file === {}) {
        let defaultimage = `/uploads/no-image.png`;
        
        let product = await Product.create({
            name,
            image: defaultimage,
            price,
            brand,
            countInStock,
            category,
            description
        });

        return res.status(201).json({
            message: "Add product successfully"
        })
    } 

    let product = await Product.create({
        name,
        image: `/uploads/${req.file.filename}`,
        price,
        brand,
        countInStock,
        category,
        description
    });

    res.status(201).json({
        message: "Add product successfully"
    });

    
});

//@desc         Get a single product with an admin role
//@route        GET    /api/products/admin/singleproduct/:productId
//@access       Private

exports.getSingleProductByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404)
        throw new Error("Product not found!")
    };

    res.status(200).json(product);

});

//@desc         Upload a single product with an admin role
//@route        PUT   /api/products/admin/singleproduct/:productId
//@access       Private

exports.updateSingleProductByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404)
        throw new Error("Product not found!")
    };

    let body = JSON.parse(req.body.body);

    let {name, image, price, brand, countInStock, category, description} = body;

    if (!name || Number(price) === 0 || !brand || Number(countInStock) === 0 || !category || !description) {
        res.status(400)
        throw new Error("Please fill in information!")
    };

    if (req.file === undefined || req.file === {}) {
        let updateproduct = await Product.findByIdAndUpdate(req.params.productId, 
        {
            name,
            image,
            price: Number(price),
            brand,
            countInStock: Number(countInStock),
            category,
            description,
        },
        {
            new: true,
            runValidators: true
        })
        
        return res.status(200).json({
            message: "Update successfully"
        })
    };

    let updateproduct = await Product.findByIdAndUpdate(req.params.productId,
    {
        name,
        image: `/uploads/${req.file.filename}`,
        price: Number(price),
        brand,
        countInStock: Number(countInStock),
        category,
        description
    },
    {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        message: "Update successfully!"
    })

    
    
});

//@desc         Delete a product
//@route        DELETE  /api/products/admin/singleproduct/:productId
//@access       Private

exports.deleteProductByAdmin = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404)
        throw new Error("User not found!")
    };

    let deleteProduct = await Product.findByIdAndDelete(req.params.productId);

    res.status(200).json(deleteProduct);
});

