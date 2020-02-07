const {createLogger, format, transports, exceptions} = require('winston')
const {timestamp, combine} = format

const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        format.json(),
    ),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new transports.Console({
            format: combine(
                format.colorize({info: 'green', debug: 'blue', warn: 'yellow', error: 'red'}),
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.simple(),
            ),
        }),
        new transports.File({filename: 'error.log', level: 'error'}),
        new transports.File({filename: 'combined.log'})
    ]
});

exceptions.handle(
    new transports.Console({
        level: 'trace',
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: true
    }),
    new transports.File({filename: 'uncaughtExceptions.log'}))

module.exports = logger