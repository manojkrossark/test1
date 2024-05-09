"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("./Log");
const log = Log_1.createEverLogger({ name: 'nestjs' });
class EverbieNestJSLogger {
    log(message) {
        log.info(message);
    }
    error(message, trace) {
        log.error(`Message: ${message}. Trace: ${trace}`);
    }
    warn(message) {
        log.warn(message);
    }
}
exports.EverbieNestJSLogger = EverbieNestJSLogger;
//# sourceMappingURL=NestJSLogger.js.map