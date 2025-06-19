import { createError } from "./errorHandler.js";
import { paginationSchema } from "../validations/pagination.validation.js";

export const getPaginationOptions = (query) => {
  const {error, value} = paginationSchema.validate(query)
  if (error) {
    throw createError(400, error.details.map(d => d.message).join(", "))
  }
  let MAX_LIMIT = 200;
  let page = parseInt(value.page) || 1;
  let limit = parseInt(value.limit) || 10;

  if (limit > MAX_LIMIT) {
    throw createError(400, `Page size must not exceed ${MAX_LIMIT}`);
  }

  page = Math.max(page, 1);
  limit = Math.max(limit, 1);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    sort: { createdAt: -1 },
  };
};
