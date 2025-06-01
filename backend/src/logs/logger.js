// import winston from 'winston';
// import debug from 'debug';
// import winstonDebug from 'winston-debug';

// // Initialize debug for logging Winston internal messages
// debug('winston:*');

// // Configure Winston logger
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//         new winston.transports.File({ filename: 'error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'combined.log' }),
//     ],
// });

// // Extend the logger with debug functionality
// winstonDebug(logger);

// export default logger;
