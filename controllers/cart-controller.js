const prisma = require("../config/prisma");
const createError = require("../utils/create-error");

exports.getCart = async (req, res, next) => {
  try {
    const getCart = await prisma.cart.findMany({
      include: {
        products: {
          select: {
            name: true,
            price: true,
            image: true,
            product_categoryId: true,
          },
        },
      },
    });
    res.json({ getCart });
  } catch (err) {
    next(err);
  }
};

exports.addCart = async (req, res, next) => {
  try {
    const { amount, comment, productId, price, roast, sweetness } = req.body;
    const { id } = req.user;
    const data = {
      user_id: id,
      amount,
      comment,
      productId,
      total_price: price,
      sweetness,
    };

    if (roast) {
      data.roast = roast;
    }

    const newOrder = await prisma.cart.create({
      data: data,
    });
    // console.log(newOrder);
    res.json({ newOrder });
  } catch (error) {
    next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { amount, sweetness, roast, comment } = req.body;
    const data = {
      amount,
      comment,
      sweetness,
    };

    if (roast) {
      data.roast = roast;
    }

    const editCart = await prisma.cart.update({
      where: { id: Number(cartId) },
      data: data,
    });

    res.json({ editCart });
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const delCart = await prisma.cart.delete({
      where: {
        id: Number(cartId),
      },
    });
    res.json({ delCart });
  } catch (error) {
    next(error);
  }
};
