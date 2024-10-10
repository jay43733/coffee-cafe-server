const express = require("express");
const cartRoute = express.Router();
const { addCart, updateCart, deleteCart } = require("../controllers/cart-controller");
const authenticate = require("../middlewares/authenticate");

cartRoute.post("/add", authenticate, addCart);

cartRoute.patch("/update", authenticate, updateCart);

cartRoute.delete("/delete", authenticate, deleteCart);

module.exports = cartRoute;
