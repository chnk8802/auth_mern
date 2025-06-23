import Joi from "joi";
import { joiObjectId } from "../custom/custom.validators.js";
import { createSparePartEntryValidation, updateSparePartEntryValidation } from "./sparePartEntry/sparePartEntry.validation.js";
import { DEVICE_COMPONENTS, REPAIR_STATUS, REPAIR_TYPE } from "../../constants/enums.js";

export const createRepairJobValidation = Joi.object({
  repairStatus: Joi.string()
    .valid(...REPAIR_STATUS)
    .default("pending"),

  customer: joiObjectId().required(),
  deviceModel: Joi.string().required(),
  deviceIMEI: Joi.string().optional().allow(null, ""),
  repairType: Joi.string()
    .valid(...REPAIR_TYPE)
    .default("Hardware"),
  issueDescription: Joi.string().required(),
  
  technician: joiObjectId().optional(),

  deviceComponents: Joi.array()
    .items(
      Joi.string().valid(...DEVICE_COMPONENTS)
    )
    .optional(),

  repairCost: Joi.number().precision(2).required(),
  discount: Joi.number().precision(2).optional().default(0),
  
  totalSparePartsCost: Joi.number().precision(2).optional(),
  finalCost: Joi.number().precision(2).optional(),
  profit: Joi.number().precision(2).optional(),

  paymentDetails: Joi.object({
    paymentStatus: Joi.string()
      .valid("paid", "unpaid", "partial")
      .default("unpaid"),
    amountReceived: Joi.number().precision(2).default(0),
    amountDue: Joi.number().precision(2).default(0),
  }).optional(),

  notes: Joi.string().optional().allow(null, ""),

  pickedAt: Joi.date().optional().allow(null),
});

export const updateRepairJobValidation = Joi.object({
  repairStatus: Joi.string()
    .valid("pending", "in-progress", "incomplete", "complete", "picked")
    .default("pending"),
  customer: joiObjectId().optional().allow(null, ""),

  deviceModel: Joi.string().optional(),

  deviceIMEI: Joi.string().optional().allow(null, "").optional(),

  issueDescription: Joi.string().optional(),

  repairType: Joi.string()
    .valid("Hardware", "Software", "Both")
    .default("Hardware"),

  technician: joiObjectId().optional().allow(null, ""),

  deviceComponents: Joi.array()
    .items(
      Joi.string().valid("Sim Tray", "Screen", "Front Camera", "Back Camera")
    )
    .optional(),

  spareParts: Joi.array().items(updateSparePartEntryValidation).optional(),

  totalSparePartsCost: Joi.number().precision(2).optional(),

  repairCost: Joi.number().precision(2).optional(),

  discount: Joi.number().precision(2).optional().default(0),

  finalCost: Joi.number().precision(2).optional(),

  paymentDetails: Joi.object({
    paymentStatus: Joi.string()
      .valid("paid", "unpaid", "partial")
      .default("unpaid"),
    amountPaid: Joi.number().precision(2).default(0),
    amountDue: Joi.number().precision(2).default(0),
  }).optional(),

  notes: Joi.string().optional().allow(null, ""),

  pickedAt: Joi.date().optional().allow(null),
}).min(1);
