const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  addOrder,
  getOrder,
  getOrderItemByOrderId,
  confirmOrder,
  cancelOrder,
  getAllOrder,
} = require("../controllers/order-controller");
const orderRoute = express.Router();
const upload = require("../middlewares/upload");

orderRoute.post("/add", authenticate, addOrder);

orderRoute.get("/getOrder", authenticate, getOrder);

orderRoute.get("/getAllOrder", authenticate, getAllOrder);

orderRoute.get("/getOrder/:orderId", authenticate, getOrderItemByOrderId);

orderRoute.patch("/confirmOrder/:orderId", authenticate, confirmOrder)

orderRoute.patch("/cancelOrder/:orderId", authenticate, cancelOrder)

module.exports = orderRoute;
