// import { createError } from "../utils/errorHandler.js";

export const notFound = (req, res, next) => {
  /* throw createError(
    404,
    `The route you want to access is invalid - ${req.originalUrl}`
  ); */
  const error = new Error(
    `The route you want to access is invalid - ${req.originalUrl}`
  );
  res.status(404).json({
    error: `The route you want to access is invalid - ${req.originalUrl}`,
    route: `${req.originalUrl}`,
  });
  next(error);
};
