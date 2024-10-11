const express = require("express");
const cartRoute = express.Router();
const {
  addCart,
  updateCart,
  deleteCart,
  getCart,
} = require("../controllers/cart-controller");
const authenticate = require("../middlewares/authenticate");

cartRoute.get("/getCart", authenticate, getCart);

cartRoute.post("/add", authenticate, addCart);

cartRoute.patch("/:cartId", authenticate, updateCart);

cartRoute.delete("/:cartId", authenticate, deleteCart);

module.exports = cartRoute;