const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const path = require("path");
const createError = require("../utils/create-error");
const fs = require("fs/promises");

exports.addOrder = async (req, res, next) => {
  // req.body.order is a JSON string, so we need to parse it to get the actual object
  const { carts, totalPrice } = JSON.parse(req.body.order);
  const { paymentMethod } = req.body;
  const { id } = req.user;
  try {
    const newOrder = await prisma.orders.create({
      data: {
        userId: id,
        total_price: totalPrice,
        paymentMethod: paymentMethod || "QRCODE",
        paymentUrl: uploadResult.secure_url || "",
      },
    });
    
    // console.log(newOrder, "NEW ORDER")
    const rmKeyinCart = carts.map(({ id, user_id, products, ...rest }) => {
      rest.order_id = newOrder.id;
      return rest;
    });

    const allItem = await prisma.order_items.createMany({
      data: rmKeyinCart,
    });
    res.json({ allItem });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  const { id } = req.user;
  try {
    const allOrder = await prisma.orders.findMany({
      where: {
        userId: id,
      },
    });
    res.json({ allOrder });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await prisma.orders.findMany({});
    res.json({ allOrder });
  } catch (err) {
    next(err);
  }
};

exports.getOrderItemByOrderId = async (req, res, next) => {
  const { id, role } = req.user;
  const { orderId } = req.params;
  try {
    if (role === "USER") {
      const orderItem = await prisma.orders.findUnique({
        where: {
          userId: id,
          id: +orderId,
        },
        include: {
          order_items: {
            include: {
              products: true,
            },
          },
        },
      });
      res.json({ orderItem });
    } else {
      const orderItem = await prisma.orders.findUnique({
        where: {
          id: +orderId,
        },
        include: {
          order_items: {
            include: {
              products: true,
            },
          },
        },
      });
      res.json({ orderItem });
    }
  } catch (err) {
    next(err);
  }
};

exports.confirmOrder = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const selectedOrder = await prisma.orders.findUnique({
      where: {
        id: Number(orderId),
      },
    });


    if (selectedOrder.status !== "PENDING") {
      return createError(400, "Status cannot be updated");
    }
    
    const confirmedOrder = await prisma.orders.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status: "COMPLETED",
      },
    });

    res.json({ confirmedOrder });
  } catch (err) {
    next(err);
  }
};

exports.cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const selectedOrder = await prisma.orders.findUnique({
      where: {
        id: Number(orderId),
      },
    });

    if (selectedOrder.status !== "PENDING") {
      return createError(400, "Status cannot be updated");
    }

    const cancelledOrder = await prisma.orders.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status: "CANCELLED",
      },
    });
    res.json({ cancelledOrder });
  } catch (err) {
    next(err);
  }
};
