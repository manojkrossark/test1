"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const io_1 = require("@pyro/io");
const env_1 = require("../env");
let ConfigService = class ConfigService {
    get(key) {
        return env_1.env[key];
    }
    get Env() {
        return env_1.env;
    }
};
ConfigService = __decorate([
    inversify_1.injectable(),
    io_1.routerName('configService')
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map