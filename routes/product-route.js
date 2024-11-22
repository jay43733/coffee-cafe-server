const express = require("express");
const authenticate = require("../middlewares/authenticate");
const productRoute = express.Router();
const { getProduct, addProduct, deleteProduct, updateProduct, getAllProduct, reactiveProduct } = require("../controllers/product-controller");
const upload = require("../middlewares/upload");

//Guest and User will see products that are only active right now.
productRoute.get("/product", getProduct);

productRoute.get("/product/all", authenticate, getAllProduct);

productRoute.post("/product/add", authenticate, upload.single("image"), addProduct);

productRoute.patch("/product/delete/:productId", authenticate, deleteProduct)

productRoute.patch("/product/reactive/:productId", authenticate, reactiveProduct)

productRoute.patch("/product/update/:productId", authenticate,  upload.single("image"), updateProduct)

module.exports = productRoute;
