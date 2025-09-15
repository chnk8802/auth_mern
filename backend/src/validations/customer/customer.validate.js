import Joi from "joi";
import { CUSTOMER_TYPES } from "../../constants/enums.js";
import { inputDataWrapper } from "../custom/custom.validators.js";
import { address } from "../address/address.validation.js";

export const createCustomer = Joi.object({
  customerType: Joi.string()
    .valid(...CUSTOMER_TYPES)
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
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian number",
    }),
  address: address,
});

const updateCustomer = Joi.object({
  customerType: Joi.string()
    .valid(...CUSTOMER_TYPES)
    .optional(),
  fullName: Joi.string().trim().min(3).max(100).optional(),
  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian number",
    }),
  address: address.optional(),
});

export const createCustomerValidation = inputDataWrapper(createCustomer);
export const updateCustomerValidation = inputDataWrapper(updateCustomer);
