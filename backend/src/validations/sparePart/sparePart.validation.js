import Joi from "joi";
import {inputDataWrapper, joiObjectId } from "../custom/custom.validators.js";
import { SPARE_PART_TYPES } from "../../constants/enums.js";

export const createSparePart = Joi.object({
  brand: Joi.string().trim().required(),
  model: Joi.string().trim().required(),
  partName: Joi.string().trim().required(),
  partType: Joi.string()
    .valid(...SPARE_PART_TYPES)
    .required(),
  costPrice: Joi.number().positive().precision(2).required(),
  stockQty: Joi.number().min(0).optional(),
  supplier: joiObjectId().optional(),
}).unknown(false);

export const updateSparePart = Joi.object({
  brand: Joi.string().trim(),
  model: Joi.string().trim(),
  partName: Joi.string().trim(),
  partType: Joi.string().valid(...SPARE_PART_TYPES),
  costPrice: Joi.number().positive().precision(2),
  stockQty: Joi.number().min(0),
  supplier: joiObjectId(),
}).min(1).unknown(false);


export const createSparePartValidation = inputDataWrapper(createSparePart)
export const updateSparePartValidation = inputDataWrapper(updateSparePart)