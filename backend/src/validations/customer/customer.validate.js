import Joi from "joi";
import { joiObjectId } from "../custom/customValidators.js";

export const createCustomerSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),
  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian number",
    }),
  address: Joi.object({
    street: Joi.string().trim().optional(),
    city: Joi.string().trim().required(),
    state: Joi.string()
      .valid(
        // States
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        // UTs
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry"
      )
      .default("Uttar Pradesh")
      .optional(),

    zip: Joi.string()
      .pattern(/^[1-9][0-9]{5}$/)
      .optional()
      .messages({
        "string.pattern.base": "ZIP must be a valid 6-digit Indian PIN code",
      }),

    country: Joi.string().valid("India").default("India").optional(),
  }).optional(),
  isBulkCustomer: Joi.boolean().optional(),
});

export const updateCustomerSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).optional(),
  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian number",
    }),
  address: Joi.object({
    street: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    state: Joi.string()
      .valid(
        // States
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        // UTs
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry"
      )
      .default("Uttar Pradesh")
      .optional(),

    zip: Joi.string()
      .pattern(/^[1-9][0-9]{5}$/)
      .optional()
      .messages({
        "string.pattern.base": "ZIP must be a valid 6-digit Indian PIN code",
      }),

    country: Joi.string().valid("India").default("India").optional(),
  }).optional(),
  isBulkCustomer: Joi.boolean().optional(),
}).min(1);

export const deleteSingleCustomerSchema = Joi.object({
  id: joiObjectId().required().messages({
    "any.required": "Customer ID is required",
    "string.pattern.name": "Invalid Customer ID",
  }),
});

export const deleteMultipleCustomersSchema = Joi.object({
  ids: Joi.array()
    .items(
      joiObjectId().messages({
        "string.pattern.name": "Invalid Customer ID in list",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "IDs must be an array",
      "array.min": "At least one ID is required",
      "any.required": "Customer IDs are required",
    }),
});

export const duplicateMultipleCustomersSchema = Joi.object({
  ids: Joi.array()
    .items(
      joiObjectId().messages({
        "string.pattern.name": "Invalid Customer ID in list",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "ids must be an array",
      "array.min": "At least one ID is required",
      "any.required": "'ids' array is required",
    }),
});
