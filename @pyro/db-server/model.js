"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@pyro/db");
const mongoose = require("mongoose");
exports.modelMetadata = 'db:model';
function getModel(DBObject) {
    let Model = Reflect.getMetadata(exports.modelMetadata, DBObject);
    if (Model == null) {
        Model = mongoose.model(DBObject.modelName, db_1.getSchema(DBObject));
        Reflect.defineMetadata(exports.modelMetadata, Model, DBObject);
    }
    return Model;
}
exports.getModel = getModel;
//# sourceMappingURL=model.js.map