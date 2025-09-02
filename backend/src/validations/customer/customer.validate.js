import Joi from "joi";
import { COUNTRIES, CUSTOMER_TYPES, STATES } from "../../constants/enums.js";
import { inputDataWrapper } from "../custom/custom.validators.js";

export const createCustomer = Joi.object({
  customerType: Joi.string()
    .valid(...CUSTOMER_TYPES)
    .default("individual")
    .required()
    .messages({
      "any.required": `"customerType" is required`,
      "any.only": `"customerType" must be one of ${CUSTOMER_TYPES.join(", ")}`,
    }),
  fullName: Joi.string().trim().min(3).max(100).required().messages({
    "any.required": `"fullName" is required`,
    "string.empty": `"fullName" cannot be empty`,
    "string.min": `"fullName" must be at least 3 characters`,
  }),
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
      .default("india")
      .optional(),
  }).optional(),
}).unknown(false);

const updateCustomer = Joi.object({
  customerType: Joi.string()
    .valid(...CUSTOMER_TYPES)
    .default("individual")
    .optional(),
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
      .default("india")
      .optional(),
  }).optional(),
}).min(1).unknown(false);

export const createCustomerValidation = inputDataWrapper(createCustomer);
export const updateCustomerValidation = inputDataWrapper(updateCustomer);
