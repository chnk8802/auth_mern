import Joi from "joi";
import { inputDataWrapper, joiObjectId } from "../../custom/custom.validators.js";

export const createPaymentEntry = Joi.object({
  repairJob: joiObjectId().required().messages({
    "any.required": "Repair job ID is required",
    "string.pattern.name": "Invalid Repair job ID",
  }),

  sparePartEntry: joiObjectId().required().messages({
    "any.required": "Spare Part Entry ID is required",
    "string.pattern.name": "Invalid Spare Part Entry ID",
  }),

  amountPaid: Joi.number().required().min(0).messages({
    "any.required": "Amount paid is required",
    "number.base": "Amount paid must be a number",
  }),

  note: Joi.string().allow("").optional(),
});

export const updatePaymentEntry = Joi.object({
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
});

export const createPaymentEntryValidation = inputDataWrapper(createPaymentEntry)
export const updatePaymentEntryValidation = inputDataWrapper(updatePaymentEntry)