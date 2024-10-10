const Joi = require("joi");
const createError = require("../utils/create-error");

const registerSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Firstname is required",
      "string.pattern.base": "Firstname must contain a-z, A-Z",
    }),
  lastName: Joi.string()
    .min(1)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Lastname is required",
      "string.pattern.base": "Lastname must contain a-z, A-Z",
    }),
  email: Joi.string()
    .email({ tlds: false })
    .messages({
      "string.empty": "Email is required",
    })
    .required(),
  phoneNumber: Joi.string()
    .pattern(/^(08|09|06)[0-9]{7,9}$/)
    .messages({
      "string.pattern.base":
        "Please enter a valid phone number starting with 08, 09, or 06",
    })
    .allow(''),
  password: Joi.string()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must contain a-z, A-Z, or 0-9 and must be at least 6 characters",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm Password is required",
    "any.only": "Passwords do not match",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid Email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  })
});

const validateSchema = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return createError(400, error.details[0].message);
  }
  req.input = value;
  next();
};

exports.registerValidate = validateSchema(registerSchema)
exports.loginValidate = validateSchema(loginSchema)
