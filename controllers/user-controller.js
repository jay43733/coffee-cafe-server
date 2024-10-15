const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");
require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = req.input;
    //1. Validate through Joi

    //2. Check if username is exist
    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserExist) {
      return createError(400, "Email is already used");
    }

    //3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //4. Create new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
      },
    });
    res.json({ User: newUser, message: "Register Successfully" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.input;

    //Check if user is in DB
    const isUserSignedUp = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!isUserSignedUp) {
      return createError(400, "User Invalid");
    }
    // console.log(isUserSignedUp)

    //Check if password is matched with DB
    const isPasswordMatched = await bcrypt.compareSync(
      password,
      isUserSignedUp.password
    );

    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      return createError(400, "User is invalid");
    }

    //If password is matched ===> Create Payload in Token
    const payload = {
      user: {
        id: isUserSignedUp.id,
        email: isUserSignedUp.email,
        firstName: isUserSignedUp.firstName,
        lastName: isUserSignedUp.lastName,
        phoneNumber: isUserSignedUp.phoneNumber,
      },
    };

    const secret = process.env.SECRET_KEY;

    //Generate Token
    const token = jwt.sign(payload, secret, {
      expiresIn: "30d",
    });
    // console.log(token);

    //Send Token to Front
    res.json({
      user: payload,
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const { email, id, firstName, lastName, role } = req.user;
    // console.log(req.user)
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { firstName, lastName, phoneNumber } = req.body;
    const data = {
      firstName,
      lastName,
      phoneNumber: phoneNumber || null
    };

    const newProfile = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
    res.json({ newProfile });
  } catch (err) {
    next(err);
  }
};
