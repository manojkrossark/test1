"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("bunyan");
const fs_1 = require("fs");
const mkdirp = require("mkdirp");
const env_1 = require("../env");
const _ = require("lodash");
const bunyan_cloudwatch_1 = require("bunyan-cloudwatch");
const os = require("os");
const PrettyStream = require("bunyan-prettystream");
let isLogsFolderExists = env_1.env.LOGS_PATH ? fs_1.existsSync(env_1.env.LOGS_PATH) : false;
const getAdditionalLoggerStreams = ({ name }) => {
    const hostname = os.hostname();
    if (env_1.env.isProd) {
        const logLevels = ['info', 'error', 'debug'];
        return _.map(logLevels, (type) => {
            let stream;
            try {
                stream = bunyan_cloudwatch_1.default({
                    logGroupName: 'Local/api',
                    logStreamName: `${type}_${name}_${hostname}`,
                    cloudWatchLogsOptions: {
                        region: 'us-east-1'
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
            return {
                stream,
                type: 'raw',
                level: type
            };
        });
    }
    else {
        return [];
    }
};
const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);
function createEverLogger({ name }) {
    if (!isLogsFolderExists) {
        mkdirp.sync(env_1.env.LOGS_PATH);
        isLogsFolderExists = true;
    }
    const logger = Logger.createLogger({
        name: `local.${name}`,
        serializers: Logger.stdSerializers,
        streams: [
            {
                level: 'info',
                path: `${env_1.env.LOGS_PATH}/info_${name}.log`
            },
            {
                level: 'error',
                path: `${env_1.env.LOGS_PATH}/error_${name}.log`
            },
            {
                level: 'debug',
                path: `${env_1.env.LOGS_PATH}/debug_${name}.log`
            },
            {
                level: 'debug',
                type: 'raw',
                stream: prettyStdOut
            },
            ...getAdditionalLoggerStreams({ name })
        ]
    });
    if (env_1.env.LOG_LEVEL) {
        logger.level(Logger[env_1.env.LOG_LEVEL.toUpperCase()]);
    }
    return logger;
}
exports.createEverLogger = createEverLogger;
function Log(logArgs) {
    return function (target) {
        target.prototype.logName = logArgs.name;
        target.prototype.log = createEverLogger(logArgs);
    };
}
exports.Log = Log;
//# sourceMappingURL=Log.js.map