"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const _ = require("lodash");
const base_1 = require("./base");
class AsyncListenerHandler extends base_1.BaseListenerHandler {
    constructor(router, listener, socket, log) {
        super(router, listener, socket, log);
        this.router = router;
        this.listener = listener;
        this.socket = socket;
        this.log = log;
    }
    handleRequest(_args) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            const callback = _.last(_args);
            const args = this.serializer(_.initial(_args));
            this.logCall(callId, args);
            try {
                const data = yield this.listener.apply(this.router, args);
                this.log.info(Object.assign({}, this.baseLogDetails, { callId, result: data }), `Listener completed`);
                callback(null, data);
            }
            catch (err) {
                this.log.error(Object.assign({}, this.baseLogDetails, { callId,
                    err }), `Listener thrown error!`);
                callback(this.serializeError(err), null);
            }
        });
    }
}
exports.AsyncListenerHandler = AsyncListenerHandler;
//# sourceMappingURL=async.js.map