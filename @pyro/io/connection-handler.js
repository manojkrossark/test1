"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router/router");
const async_1 = require("./listener/handler/async");
const observable_1 = require("./listener/handler/observable");
const listener_1 = require("./listener/listener");
const types_1 = require("./listener/types");
class ConnectionHandler {
    constructor(socket, router, log) {
        this.socket = socket;
        this.router = router;
        this.log = log;
        this.listeners = router_1.getListeners(this.router);
        this.routerName = router_1.getRouterName(this.router);
    }
    handle() {
        this.log.info({
            socketId: this.socket.id,
            listeners: this.listeners.map((listener) => listener.name),
            routerName: this.routerName
        }, `Socket connected! Starting listeners listening!`);
        try {
            this.listeners.forEach((listener) => {
                const handler = this.listenerHandlerFactory(listener);
                handler.handle();
            });
        }
        catch (err) {
            this.log.fatal("Couldn't start listeners listening!", { err });
        }
        this.socket.on('disconnect', () => {
            this.onDisconnection();
        });
    }
    listenerHandlerFactory(listener) {
        switch (listener_1.getListenerType(listener)) {
            case types_1.ListenerType.Async:
                return new async_1.AsyncListenerHandler(this.router, listener, this.socket, this.log);
            case types_1.ListenerType.Observable:
                return new observable_1.ObservableListenerHandler(this.router, listener, this.socket, this.log);
            default:
                throw new Error(`Bad listener type! ${listener_1.getListenerType(listener)}`);
        }
    }
    onDisconnection() {
        this.log.info({
            socketId: this.socket.id,
            listeners: this.listeners.map((listener) => listener.name),
            routerName: this.routerName
        }, `Socket disconnected!`);
    }
}
exports.ConnectionHandler = ConnectionHandler;
//# sourceMappingURL=connection-handler.js.map