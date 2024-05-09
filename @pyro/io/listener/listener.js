"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../router/metadata");
const metadata_2 = require("./metadata");
exports.listenerOf = (listenerType) => () => (router, propertyKey, descriptor) => {
    const method = router[propertyKey];
    if (!Reflect.hasMetadata(metadata_1.routerMetadata.listeners, router.constructor)) {
        Reflect.defineMetadata(metadata_1.routerMetadata.listeners, [], router.constructor);
    }
    const listeners = Reflect.getMetadata(metadata_1.routerMetadata.listeners, router.constructor);
    listeners.push(method);
    Reflect.defineMetadata(metadata_2.listenerMetadata.type, listenerType, method);
};
exports.getListenerType = (listener) => {
    return Reflect.getMetadata(metadata_2.listenerMetadata.type, listener);
};
//# sourceMappingURL=listener.js.map