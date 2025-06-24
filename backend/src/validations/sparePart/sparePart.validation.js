import Joi from "joi";
import {inputDataWrapper, joiObjectId } from "../custom/custom.validators.js";

export const createSparePart = Joi.object({
  brand: Joi.string().trim().required(),
  model: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  partType: Joi.string()
    .valid("Display", "Battery", "Processor", "Camera", "Storage", "Other")
    .required(),
  costPrice: Joi.number().positive().precision(2).required(),
  stockQty: Joi.number().min(0).optional(),
  supplier: joiObjectId().optional(),
});

export const updateSparePart = Joi.object({
  brand: Joi.string().trim(),
  model: Joi.string().trim(),
  name: Joi.string().trim(),
  partType: Joi.string().valid("Display", "Battery", "IC", "Camera", "Storage", "Other"),
  costPrice: Joi.number().positive().precision(2),
  stockQty: Joi.number().min(0),
  supplier: joiObjectId(),
}).min(1);


export const createSparePartValidation = inputDataWrapper(createSparePart)
export const updateSparePartValidation = inputDataWrapper(updateSparePart)