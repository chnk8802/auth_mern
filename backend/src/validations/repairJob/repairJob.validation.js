import Joi from "joi";
import { inputDataWrapper, joiObjectId } from "../custom/custom.validators.js";
import {
  DEVICE_COMPONENTS,
  PAYMENT_STATUSES,
  REPAIR_STATUS,
  REPAIR_TYPE,
} from "../../constants/enums.js";
import { createSparePartEntry } from "./sparePartEntry/sparePartEntry.validation.js";

export const createRepairJob = Joi.object({
  repairStatus: Joi.string()
    .required()
    .valid(...REPAIR_STATUS),
  customer: joiObjectId().required(),
  deviceModel: Joi.string().required(),
  deviceIMEI: Joi.string().optional().allow(null, ""),
  repairType: Joi.string()
    .valid(...REPAIR_TYPE)
    .default("hardware"),
  technician: joiObjectId().optional().allow(null, ""),
  issueDescription: Joi.string().required(),
  deviceComponents: Joi.array()
    .items(Joi.string().valid(...DEVICE_COMPONENTS))
    .optional(),
  sparePartEntries: Joi.array()
    .items(createSparePartEntry)
    .optional(),
  repairCost: Joi.number().required(),
  discount: Joi.number().optional(),
  notes: Joi.string().optional().allow(null, ""),
  paymentStatus: Joi.string()
    .valid(...PAYMENT_STATUSES)
    .default("unpaid"),
  amountReceived: Joi.number().optional(),
  amountDue: Joi.number().optional(),
});

export const updateRepairJob = Joi.object({
  repairStatus: Joi.string()
    .optional()
    .valid(...REPAIR_STATUS),
  customer: joiObjectId().optional().allow(null, ""),
  deviceModel: Joi.string().optional(),
  deviceIMEI: Joi.string().optional().allow(null, ""),
  issueDescription: Joi.string().optional(),
  repairType: Joi.string()
    .valid(...REPAIR_TYPE)
    .default("hardware")
    .optional(),
  technician: joiObjectId().optional().allow(null, ""),
  deviceComponents: Joi.array()
    .items(Joi.string().valid(...DEVICE_COMPONENTS))
    .optional(),
  repairCost: Joi.number().optional(),
  discount: Joi.number().optional(),
  notes: Joi.string().optional().allow(null, ""),

  // totalSparePartsCost: Joi.number().optional(),

  // sparePartEntries: Joi.array().items(updateSparePartEntryValidation).optional(),

  // totalReceivable: Joi.number().optional(),

  // profit: Joi.number().optional(),

  paymentStatus: Joi.string()
    .valid(...PAYMENT_STATUSES)
    .default("unpaid"),
  amountReceived: Joi.number().optional(),
  amountDue: Joi.number().optional(),

  pickedAt: Joi.date().optional().allow(null),
});

export const createRepairJobValidation = inputDataWrapper(createRepairJob);
export const updateRepairJobValidation = inputDataWrapper(updateRepairJob);
