const app = require('express')();
const initStats = require('@zenmate/stats');

const { statsMiddleware, getStats } = initStats({ endpointStats: true });
const winston = require('winston');
const expressWinston = require('express-winston');
const winstonRotate = require('winston-daily-rotate-file');

// stats
app.use(statsMiddleware);


// Winston
// Winston & express config
let date = new Date();
const logFormat = winston.format.printf(function(info) {
    return `${date} - ${info.level}: ${info.message}\n`;
});

var fileLoggerWithRotate = new(winston.transports.DailyRotateFile)({
    filename: `${__dirname}/log/application-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const config = {
    transports: [
        // comment console logging if not needed
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), logFormat)
        }),
        // write to file with log rotation
        fileLoggerWithRotate
    ],
    format: winston.format.combine(
        winston.format.json()
    ),
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function(req, res) { return false; }
};

const logger = winston.createLogger(config);
app.use(expressWinston.logger(config));


// routes should come after winston middleware
// dummy route to get metrics
app.get('/', (req, res) => res.end('Hello'));

// route to view app statics as seen from inside node.js
app.get('/stats', (req, res) => res.send(getStats()));


// Global error handler
process.on('beforeExit', (code) => {
    logger.error('Process beforeExit event with code:', code);
});

process.on('exit', (code) => {
    logger.error('Process exit event with code:', code);
});

process.on('uncaughtException', function(err) {
    logger.error('Caught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});


app.listen(3000);
logger.info('Server is running on http://localhost:3000');
