const createError = require("../utils/create-error");
const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const path = require("path");
const fs = require("fs/promises");
exports.getProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.product.findMany({
      where: {
        product_status: "ACTIVE",
      },
    });
    res.json({ allProduct });
  } catch (err) {
    next(err);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.product.findMany({});
    res.json({ allProduct });
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  const { name, description, price, isRecommended, product_categoryId } =
    req.body;
  const haveFile = Boolean(req.file);
  let uploadResult = {};
  try {
    if (haveFile) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,
        public_id: path.parse(req.file.path).name,
      });
      fs.unlink(req.file.path);
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        description: description,
        image: uploadResult.secure_url || "",
        price: price,
        isRecommended: isRecommended,
        product_categoryId: Number(product_categoryId),
      },
    });

    res.json({ newProduct });
  } catch (err) {
    next(err);
  }
};

exports.reactiveProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const isInactive = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (isInactive.product_status === "ACTIVE") {
      return createError(400, `${isInactive.name} is already active`);
    }

    const reactiveProduct = await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        product_status: "ACTIVE",
      },
    });
    res.json({ reactiveProduct });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const isActive = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (isActive.product_status === "INACTIVE") {
      return createError(400, `${isInactive.name} is already inactive`);
    }

    const inactiveProduct = await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        product_status: "INACTIVE",
      },
    });
    res.json({ inactiveProduct });
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price, isRecommended, product_categoryId } =
    req.body;
  const haveFile = Boolean(req.file);
  const finalIsRecommended = isRecommended === "true" ? true : false;
  // console.log(finalIsRecommended, "REcommenddd");
  let uploadResult = {};
  try {
    if (haveFile) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,
        public_id: path.parse(req.file.path).name,
      });
      fs.unlink(req.file.path);
    }

    const editProduct = await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        name: name,
        price: price,
        description: description,
        isRecommended: isRecommended === "true" ? true : false,
        image: uploadResult.secure_url,
        product_categoryId: Number(product_categoryId),
      },
    });
    console.log(editProduct.isRecommended, "NEW PRODUCT");
    res.json({ editProduct });
  } catch (error) {
    next(error);
  }
};
