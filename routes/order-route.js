const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  addOrder,
  getOrder,
  getOrderItemByOrderId,
} = require("../controllers/order-controller");
const orderRoute = express.Router();
const upload = require("../middlewares/upload");

orderRoute.post("/add", authenticate, upload.single("image"), addOrder);

orderRoute.get("/getOrder", authenticate, getOrder);

orderRoute.get("/getOrder/:orderId", authenticate, getOrderItemByOrderId);

module.exports = orderRoute;
