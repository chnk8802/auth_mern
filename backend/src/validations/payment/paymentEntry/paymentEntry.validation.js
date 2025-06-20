import Joi from "joi";
import { joiObjectId } from "../../custom/custom.validators.js";

export const createPaymentEntryValidation = Joi.object({
  repairJob: joiObjectId().required().messages({
    "any.required": "Repair job ID is required",
    "string.pattern.name": "Invalid Repair job ID",
  }),

  supplier: joiObjectId().required().messages({
    "any.required": "Supplier ID is required",
    "string.pattern.name": "Invalid Supplier ID",
  }),

  amountPaid: Joi.number().required().min(0).messages({
    "any.required": "Amount paid is required",
    "number.base": "Amount paid must be a number",
  }),

  note: Joi.string().allow("").optional(),
});

export const updatePaymentEntryValidation = Joi.object({
  repairJob: joiObjectId().optional().messages({
    "any.required": "Repair job ID is required",
    "string.pattern.name": "Invalid Repair job ID",
  }),

  supplier: joiObjectId().optional().messages({
    "any.required": "Supplier ID is required",
    "string.pattern.name": "Invalid Supplier ID",
  }),

  amountPaid: Joi.number().optional().min(0).messages({
    "any.required": "Amount paid is required",
    "number.base": "Amount paid must be a number",
  }),

  note: Joi.string().allow("").optional(),
}).min(1);
