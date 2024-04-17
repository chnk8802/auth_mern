const notFound = (req, res, next) => {
    const error = new Error(`The route you want to access is invalid - ${req.originalUrl}`);
    res.status(404).json({"error": `The route you want to access is invalid - ${req.originalUrl}`,"route": `${req.originalUrl}`});
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

export default { notFound, errorHandler }