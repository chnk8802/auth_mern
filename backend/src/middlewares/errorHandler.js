export const notFound = (req, res, next) => {
    const error = new Error(`The route you want to access is invalid - ${req.originalUrl}`);
    res.status(404).json({"error": `The route you want to access is invalid - ${req.originalUrl}`,"route": `${req.originalUrl}`});
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    console.log(err)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        status: "error",
        statusCode: statusCode,
        message: err.message || "Internal server error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};