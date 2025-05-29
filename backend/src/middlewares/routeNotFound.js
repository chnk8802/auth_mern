export const notFound = (req, res, next) => {
    const error = new Error(`The route you want to access is invalid - ${req.originalUrl}`);
    res.status(404).json({"error": `The route you want to access is invalid - ${req.originalUrl}`,"route": `${req.originalUrl}`});
    next(error);
};