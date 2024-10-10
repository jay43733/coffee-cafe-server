const express = require("express");
const userRoute = express.Router();
const { registerValidate, loginValidate } = require("../middlewares/validator");
const { register, login, getMe } = require("../controllers/user-controller");
const authenticate = require("../middlewares/authenticate");

userRoute.post("/login", loginValidate, login);

userRoute.post("/register", registerValidate, register);

userRoute.post("/me", authenticate, getMe)

module.exports = userRoute;
