const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    // console.log(authorization)
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return createError(401, "Unauthorized 1");
    }


    const token = authorization.split(" ")[1];
    if (!token) {
      return createError(401, "Unauthorized 2");
    }
    // console.log(token)

    const payload = jwt.verify(token, secret);

    // console.log(payload);
    const foundUser = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!foundUser) {
      return createError(401, "Unauthorized  3");
    }

    const { password, createdAt, ...userData } = foundUser;
    req.user = userData;
    // console.log(req.user, ".........")
    next()
  } catch (err) {
    next(err);
  }
};
