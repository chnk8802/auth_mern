export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || String(err) || "Internal server error";

    res.status(statusCode).json({
        data: null,
        message,
        meta: {
            code: statusCode,
            status: "error",
            timestamp: new Date().toISOString()
        },
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    });
};