const prisma = require("../config/prisma");
const createError = require("../utils/create-error");

exports.addCart = async (req, res, next) => {
  try {
    const { amount, comment, productId, price, roast, sweetness } = req.body;
    const { id } = req.user;
    const data = {
      user_id: id,
      amount,
      comment,
      product_id: productId,
      total_price : price,
      roast,
      sweetness,
    };
    const newOrder = await prisma.cart.create({
      data: data
    });
    console.log(newOrder);
    res.json({ message: "Hello Post Cart" });
  } catch (error) {
    next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    res.json({ message: "Hello Patch Cart" });
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    res.json({ message: "Hello Delete Cart" });
  } catch (error) {
    next(error);
  }
};
