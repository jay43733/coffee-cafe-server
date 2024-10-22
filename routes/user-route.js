const express = require("express");
const userRoute = express.Router();
const { registerValidate, loginValidate } = require("../middlewares/validator");
const {
  register,
  login,
  getMe,
  editProfile,
  getAllUser,
  changeRole,
  deleteUser,
  activateUser,
} = require("../controllers/user-controller");
const authenticate = require("../middlewares/authenticate");

userRoute.post("/login", loginValidate, login);

userRoute.post("/register", registerValidate, register);

userRoute.post("/me", authenticate, getMe);

userRoute.patch("/edit", authenticate, editProfile);

userRoute.get("/getAllUser", authenticate,getAllUser)

userRoute.patch("/role/:userId", authenticate,changeRole)

userRoute.patch("/delete/:userId", authenticate, deleteUser)

userRoute.patch("/activateUser/:userId", authenticate, activateUser)

module.exports = userRoute;
