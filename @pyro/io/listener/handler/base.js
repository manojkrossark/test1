"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../router/router");
const listener_1 = require("../listener");
const serialization_1 = require("../serialization");
const _ = require("lodash");
const getArgsNames = require("@captemulation/get-parameter-names");
class BaseListenerHandler {
    constructor(_router, _listener, _socket, _log) {
        this._router = _router;
        this._listener = _listener;
        this._socket = _socket;
        this._log = _log;
        this.routerName = router_1.getRouterName(this._router);
        this.listenerType = listener_1.getListenerType(this._listener);
        this.listenerArgumentsNames = getArgsNames(this._listener);
        this.baseLogDetails = {
            socketId: this._socket.id,
            listenerName: this._listener.name,
            listenerType: this.listenerType,
            routerName: this.routerName
        };
        this.serializer = serialization_1.getListenerSerializer(_listener);
    }
    handle() {
        this._socket.on(this._listener.name, (...args) => {
            this.handleRequest(args);
        });
    }
    logCall(callId, args) {
        this._log.info(Object.assign({}, this.baseLogDetails, { callId, args: _.zipObject(this.listenerArgumentsNames, args) }), `Listener called`);
    }
    serializeError(_error) {
        if (_error instanceof Error) {
            const error = _error;
            return {
                __isError__: true,
                name: error.name,
                message: error.message
            };
        }
        else {
            return _error;
        }
    }
}
exports.BaseListenerHandler = BaseListenerHandler;
//# sourceMappingURL=base.js.map