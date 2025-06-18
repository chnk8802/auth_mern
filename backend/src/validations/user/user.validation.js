import Joi from "joi";

export const signupUserSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Relaxed validation (no .com/.in restriction)
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number",
      "string.empty": "Password is required",
    }),

  fullName: Joi.string().trim().min(3).max(100).optional(),

  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be a valid 10-digit Indian number",
    }),

  address: Joi.object({
    street: Joi.string().trim().optional(),
    city: Joi.string().trim().optional(),
    state: Joi.string()
      .valid(
        // States
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
        "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
        "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
        "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal",
        // UTs
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
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

  role: Joi.string().valid("admin", "manager", "technician").required()
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/)
    .required()
    .messages({
      "string.pattern.base": "Email must be a valid address ending with .com or .in",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
});

export const updateUserSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100),

  phone: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone number must be a valid 10-digit Indian number",
    }),

  address: Joi.object({
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    state: Joi.string()
      .valid(
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
        "Ladakh", "Lakshadweep", "Puducherry"
      ),
    zip: Joi.string()
      .pattern(/^[1-9][0-9]{5}$/)
      .messages({
        "string.pattern.base": "ZIP must be a valid 6-digit Indian PIN code",
      }),
    country: Joi.string().valid("India"),
  }),

  role: Joi.string().valid("admin", "manager", "technician"),
}).min(1); // Ensure at least one field is being updated