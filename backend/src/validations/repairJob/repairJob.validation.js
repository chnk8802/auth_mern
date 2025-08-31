import Joi from "joi";
import { inputDataWrapper, joiObjectId } from "../custom/custom.validators.js";
import {
  DEVICE_COMPONENTS,
  REPAIR_STATUS,
  REPAIR_TYPE,
} from "../../constants/enums.js";

export const createRepairJob = Joi.object({
  customer: joiObjectId().required(),
  deviceModel: Joi.string().required(),
  deviceIMEI: Joi.string().optional().allow(null, ""),
  repairType: Joi.string()
    .valid(...REPAIR_TYPE)
    .default("hardware"),
  issueDescription: Joi.string().required(),
  deviceComponents: Joi.array()
    .items(Joi.string().valid(...DEVICE_COMPONENTS))
    .optional(),
  repairCost: Joi.number().precision(2).required(),
  discount: Joi.number().precision(2).optional(),
  notes: Joi.string().optional().allow(null, ""),
});

export const updateRepairJob = Joi.object({
  repairStatus: Joi.string()
    .valid(...REPAIR_STATUS)
    .default("pending"),
  customer: joiObjectId().optional().allow(null, ""),
  deviceModel: Joi.string().optional(),
  deviceIMEI: Joi.string().optional().allow(null, "").optional(),
  issueDescription: Joi.string().optional(),
  repairType: Joi.string()
    .valid(...REPAIR_TYPE)
    .default("hardware"),
  technician: joiObjectId().optional().allow(null, ""),
  deviceComponents: Joi.array()
    .items(Joi.string().valid(...DEVICE_COMPONENTS))
    .optional(),
  repairCost: Joi.number().precision(2).optional(),
  discount: Joi.number().precision(2).optional(),
  notes: Joi.string().optional().allow(null, ""),

  // totalSparePartsCost: Joi.number().precision(2).optional(),

  // sparePartsEntries: Joi.array().items(updateSparePartEntryValidation).optional(),

  // totalReceivable: Joi.number().precision(2).optional(),

  // profit: Joi.number().precision(2).optional(),

  // paymentDetails: Joi.object({
  //   paymentStatus: Joi.string()
  //     .valid(...PAYMENT_STATUS)
  //     .default("unpaid"),
  //   amountReceived: Joi.number().precision(2).default(0),
  //   amountDue: Joi.number().precision(2).default(0),
  // }).optional(),

  pickedAt: Joi.date().optional().allow(null),
}).min(1);


export const createRepairJobValidation = inputDataWrapper(createRepairJob)
export const updateRepairJobValidation = inputDataWrapper(updateRepairJob)