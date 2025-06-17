import Joi from "joi";
import { joiObjectId } from "../custom/customValidators.js";

export const createSparePartEntrySchema = Joi.object({
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

export const updateSparePartEntrySchema = Joi.object({
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