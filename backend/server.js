
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = express();
const PORT = process.env.PORT || 8000;
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const orderRoute = require("./routes/orderRoutes");
//Connect database
connectDB();

//Middleware Functionality
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "routes/public")));
//API Routes

app.use("/api/products", productRoutes);
app.use("/api/users", authRoutes);
app.use("/api/orders", orderRoute);
app.get("/api/config/clientId", function (req, res) {
    res.send({clientId: process.env.PAYPAY_CLIENT_ID});
});
//Error Handling
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("/Users/thongdang/Desktop/dev/e-commerce-project/frontend/build"))

    app.get("*", (req, res) => res.sendFile(path.resolve("/Users/thongdang/Desktop/dev/e-commerce-project/", "frontend", "build", "index.html")))
}

console.log(path.join("/Users/thongdang/Desktop/dev/e-commerce-project", "/frontend/build"));
//Port to listen

app.listen(PORT, function () {
    console.log(`Server is listening at PORT: ${PORT}`.green.underline.bold);
});


