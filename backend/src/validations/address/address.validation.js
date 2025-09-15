import Joi from "joi";

export const address = Joi.object({
  street: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  state: Joi.string().trim(),
  country: Joi.string().trim(),
  zip: Joi.string()
    .trim()
    .pattern(/^[1-9][0-9]{5}$/)
    .messages({
      "string.pattern.base": "ZIP must be a valid 6-digit Indian PIN code",
    }),
});
