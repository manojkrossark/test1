"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
exports.loggerMock = bunyan.createLogger({
    name: 'testingLoggerMock',
    streams: []
});
//# sourceMappingURL=loggerMock.js.map