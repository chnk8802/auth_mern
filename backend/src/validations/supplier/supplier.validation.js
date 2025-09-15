import Joi from "joi";
import { inputDataWrapper } from "../custom/custom.validators.js";
import { address } from "../address/address.validation.js";

export const createSupplier = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),
  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian number",
    }),
  address: address
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
  address: address
});
export const createSupplierValidation = inputDataWrapper(createSupplier)
export const updateSupplierValidation = inputDataWrapper(updateSupplier)