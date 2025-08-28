// src/validations/lookup/lookup.validation.js
import Joi from "joi";

export const lookupValidation = Joi.object({
  module: Joi.string().trim().required(),
  displayField: Joi.string().trim().required(), // comma-separated list
  criteria: Joi.alternatives().try(Joi.string(), Joi.object()).optional(),
  search: Joi.string().trim().allow("").optional(),
  populate: Joi.alternatives().try(Joi.string(), Joi.object(), Joi.array()).optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  // sort: Joi.string().trim().optional(),
});
