const express = require("express");
const authenticate = require("../middlewares/authenticate");
const productRoute = express.Router();
const { getProduct } = require("../controllers/product-controller");

productRoute.get("/product", getProduct);



module.exports = productRoute;
