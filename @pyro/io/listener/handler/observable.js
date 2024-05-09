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
const _ = require("lodash");
const base_1 = require("./base");
class ObservableListenerHandler extends base_1.BaseListenerHandler {
    constructor(router, listener, socket, log) {
        super(router, listener, socket, log);
        this.router = router;
        this.listener = listener;
        this.socket = socket;
        this.log = log;
    }
    handleRequest(_args) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = _.last(_args);
            const args = this.serializer(_.initial(_args));
            this.logCall(callId, args);
            const observable = Reflect.apply(this.listener, this.router, args);
            this.socket.on(`${callId}_subscribe`, (subscriptionId) => {
                const subscription = observable.subscribe({
                    next: (value) => {
                        this.log.info(Object.assign({}, this.baseLogDetails, { callId,
                            value }), `Listener emitted next value`);
                        this.socket.emit(`${subscriptionId}_next`, value);
                    },
                    error: (err) => {
                        this.log.error(Object.assign({}, this.baseLogDetails, { callId,
                            err }), `Listener thrown error!`);
                        this.socket.emit(`${subscriptionId}_error`, this.serializeError(err));
                    },
                    complete: () => {
                        this.log.info(Object.assign({}, this.baseLogDetails, { callId }), `Listener completed`);
                        this.socket.emit(`_${subscriptionId}_complete`);
                    }
                });
                this.socket.on(`${subscriptionId}_unsubscribe`, () => subscription.unsubscribe());
                this.socket.on('disconnect', () => subscription.unsubscribe());
            });
        });
    }
}
exports.ObservableListenerHandler = ObservableListenerHandler;
//# sourceMappingURL=observable.js.map