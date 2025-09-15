import Joi from "joi";
import { COUNTRIES, STATES, USER_ROLES } from "../../constants/enums.js";
import { inputDataWrapper } from "../custom/custom.validators.js";

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

  address: Joi.object({
    street: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    state: Joi.string()
      .valid(...STATES)
      .default("uttar_pradesh")
      .optional(),

    zip: Joi.string()
      .pattern(/^[1-9][0-9]{5}$/)
      .optional()
      .messages({
        "string.pattern.base": "ZIP must be a valid 6-digit Indian PIN code",
      }),

    country: Joi.string()
      .valid(...COUNTRIES)
      .default("ndia")
      .optional(),
  }).optional(),

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

  address: Joi.object({
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    state: Joi.string().valid(...STATES),
    zip: Joi.string()
      .pattern(/^[1-9][0-9]{5}$/)
      .messages({
        "string.pattern.base": "ZIP must be a valid 6-digit Indian PIN code",
      }),
    country: Joi.string().valid(...COUNTRIES),
  }),

  role: Joi.string().valid(...USER_ROLES),
});

export const updateUserValidation = inputDataWrapper(updateUser);
