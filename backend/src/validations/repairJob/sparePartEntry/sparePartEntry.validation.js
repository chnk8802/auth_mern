import Joi from "joi";
import {inputDataWrapper, joiObjectId } from "../../custom/custom.validators.js";
import { SPARE_PART_SOURCE_TYPE } from "../../../constants/enums.js";

export const createSparePartEntry = Joi.object({
  repairJob: joiObjectId().required(),
  sourceType: Joi.string().valid(...SPARE_PART_SOURCE_TYPE).required(),
  sparePart: Joi.when("sourceType", {
    is: "in_house",
    then: joiObjectId().required(),
    otherwise: Joi.forbidden(),
  }),
  externalPartName: Joi.when("sourceType", {
    is: "external",
    then: Joi.string().trim().required(),
    otherwise: Joi.forbidden(),
  }),
  supplier: joiObjectId().required(),
  unitCost: Joi.number().min(0).required(),
  isPaid: Joi.boolean().optional()
});

export const updateSparePartEntry = Joi.object({
  sourceType: Joi.string().valid(...SPARE_PART_SOURCE_TYPE),
  sparePart: Joi.when("sourceType", {
    is: "in_house",
    then: joiObjectId(),
    otherwise: Joi.forbidden(),
  }),
  externalPartName: Joi.when("sourceType", {
    is: "external",
    then: Joi.string().trim(),
    otherwise: Joi.forbidden(),
  }),
  supplier: joiObjectId(),
  unitCost: Joi.number().optional(),
  isPaid: Joi.boolean().optional()
});

export const createSparePartEntryValidation = inputDataWrapper(createSparePartEntry)
export const updateSparePartEntryValidation = inputDataWrapper(updateSparePartEntry)