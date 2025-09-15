import Joi from "joi";
import { COUNTRIES, STATES } from "../../constants/enums.js";
import { inputDataWrapper } from "../custom/custom.validators.js";

export const createSupplier = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),
  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian number",
    }),
  address: Joi.object({
    street: Joi.string().trim().optional(),
    city: Joi.string().trim().required(),
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

    country: Joi.string().valid(...COUNTRIES).default("india").optional(),
  }).optional(),
});

export const updateSupplier = Joi.object({
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

    country: Joi.string().valid(...COUNTRIES).default("india").optional(),
  }).optional()
});
export const createSupplierValidation = inputDataWrapper(createSupplier)
export const updateSupplierValidation = inputDataWrapper(updateSupplier)