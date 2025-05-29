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