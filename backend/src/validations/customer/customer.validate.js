import Joi from "joi";
import { COUNTRIES, STATES } from "../../constants/enums.js";
import { inputDataWrapper } from "../custom/custom.validators.js";

export const createCustomer = Joi.object({
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
    city: Joi.string().trim().optional(),
    state: Joi.string()
      .trim()
      .valid(...STATES)
      .default("Uttar Pradesh")
      .optional(),

    zip: Joi.string()
      .pattern(/^[1-9][0-9]{5}$/)
      .optional()
      .messages({
        "string.pattern.base": "ZIP must be a valid 6-digit Indian PIN code",
      }),

    country: Joi.string().valid(...COUNTRIES).default("India").optional(),
  }).optional(),
  isBulkCustomer: Joi.boolean().optional(),
});

const updateCustomer = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).optional(),
  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian number",
    }),
  address: Joi.object({
    street: Joi.string().allow("").trim().optional(),
    city: Joi.string().trim().optional(),
    state: Joi.string()
      .valid(...STATES)
      .default("Uttar Pradesh")
      .optional(),

    zip: Joi.string()
      .pattern(/^[1-9][0-9]{5}$/)
      .optional()
      .messages({
        "string.pattern.base": "ZIP must be a valid 6-digit Indian PIN code",
      }),

    country: Joi.string()
      .valid(...COUNTRIES)
      .default("India")
      .optional(),
  }).optional(),
  isBulkCustomer: Joi.boolean().optional(),
}).min(1);


export const createCustomerValidation = inputDataWrapper(createCustomer)
export const updateCustomerValidation = inputDataWrapper(updateCustomer)