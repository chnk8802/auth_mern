import Joi from "joi";
import {inputDataWrapper, joiObjectId } from "../../custom/custom.validators.js";

export const createSparePartEntry = Joi.object({
  repairJob: joiObjectId().required(),
  sourceType: Joi.string().valid("In-house", "External").required(),
  sparePart: Joi.when("sourceType", {
    is: "In-house",
    then: joiObjectId().required(),
    otherwise: Joi.forbidden(),
  }),
  externalPartName: Joi.when("sourceType", {
    is: "External",
    then: Joi.string().trim().required(),
    otherwise: Joi.forbidden(),
  }),
  supplier: joiObjectId().required(),
  unitCost: Joi.number().min(0).required(),
});

export const updateSparePartEntry = Joi.object({
  sourceType: Joi.string().valid("In-house", "External"),
  sparePart: Joi.when("sourceType", {
    is: "In-house",
    then: joiObjectId(),
    otherwise: Joi.forbidden(),
  }),
  externalPartName: Joi.when("sourceType", {
    is: "External",
    then: Joi.string().trim(),
    otherwise: Joi.forbidden(),
  }),
  supplier: joiObjectId(),
  unitCost: Joi.number().min(0),
});

export const createSparePartEntryValidation = inputDataWrapper(createSparePartEntry)
export const updateSparePartEntryValidation = inputDataWrapper(updateSparePartEntry)