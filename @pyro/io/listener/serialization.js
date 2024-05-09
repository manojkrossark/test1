"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
exports.serialization = (serializeFunction) => (router, propertyKey, parameterIndex) => {
    const listener = router[propertyKey];
    if (!Reflect.hasMetadata(metadata_1.listenerMetadata.serializers, listener)) {
        Reflect.defineMetadata(metadata_1.listenerMetadata.serializers, [], listener);
    }
    Reflect.getMetadata(metadata_1.listenerMetadata.serializers, listener)[parameterIndex] = serializeFunction;
};
exports.getListenerSerializer = (listener) => {
    const serializers = Reflect.getMetadata(metadata_1.listenerMetadata.serializers, listener);
    if (serializers == null) {
        return (args) => args;
    }
    return (args) => {
        return args.map((arg, i) => (serializers[i] != null ? serializers[i](arg) : arg));
    };
};
//# sourceMappingURL=serialization.js.map