"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
exports.RouterSymbol = Symbol('Router');
exports.routerName = (name) => Reflect.metadata(metadata_1.routerMetadata.name, name);
exports.getRouterName = (router) => {
    return Reflect.getMetadata(metadata_1.routerMetadata.name, router.constructor);
};
exports.getListeners = (router) => {
    return Reflect.getMetadata(metadata_1.routerMetadata.listeners, router.constructor);
};
//# sourceMappingURL=router.js.map