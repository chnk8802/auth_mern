import Joi from "joi";
import { inputDataWrapper } from "../custom/custom.validators.js";
import { address } from "../address/address.validation.js";
import { USER_ROLES } from "../../constants/enums.js";

export const signupUserValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number",
      "string.empty": "Password is required",
    }),

  fullName: Joi.string().trim().min(3).max(100).optional(),

  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian number",
    }),

  address: address,

  role: Joi.string()
    .valid(...USER_ROLES)
    .required(),
});

export const loginUserValidation = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/)
    .required()
    .messages({
      "string.pattern.base":
        "Email must be a valid address ending with .com or .in",
      "string.empty": "Email is required",
    }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const updateUser = Joi.object({
  fullName: Joi.string().trim().min(3).max(100),

  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian number",
    }),

  address: address,

  role: Joi.string().valid(...USER_ROLES),
});

export const updateUserValidation = inputDataWrapper(updateUser);
