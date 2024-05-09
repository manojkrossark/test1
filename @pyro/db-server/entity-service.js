"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@pyro/db-server/model");
const mongoose = require("mongoose");
const inversify_1 = require("inversify");
let EntityService = class EntityService {
    get Model() {
        return model_1.getModel(this.DBObject);
    }
    getObjectId(id) {
        return new mongoose.Types.ObjectId(id);
    }
    parse(obj) {
        if (obj == null) {
            return null;
        }
        else {
            return new this.DBObject(obj);
        }
    }
};
EntityService = __decorate([
    inversify_1.injectable()
], EntityService);
exports.EntityService = EntityService;
//# sourceMappingURL=entity-service.js.map