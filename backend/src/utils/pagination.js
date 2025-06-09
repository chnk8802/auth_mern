// utils/pagination.js
import { createError } from "./errorHandler.js";
export const getPaginationOptions = (query) => {
  let MAX_LIMIT = 200;
  let page = parseInt(query.page) || 1;
  let limit = parseInt(query.limit) || 10;

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
