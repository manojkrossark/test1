"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const _ = require("lodash");
const rxjs_1 = require("rxjs");
const inversify_1 = require("inversify");
const existence_1 = require("./existence");
const from_1 = require("rxjs/observable/from");
const operators_1 = require("rxjs/operators");
const of_1 = require("rxjs/observable/of");
const uuid_1 = require("uuid");
const entity_service_1 = require("@pyro/db-server/entity-service");
let DBService = class DBService extends entity_service_1.EntityService {
    constructor() {
        super();
        this.existence = new rxjs_1.Subject();
    }
    get(id) {
        const callId = uuid_1.v1();
        return from_1.from(this.getCurrent(id)).pipe(operators_1.concat(this.existence.pipe(operators_1.filter((existenceEvent) => id === existenceEvent.id), operators_1.map((existenceEvent) => existenceEvent.value), operators_1.share())), operators_1.tap({
            next: (obj) => {
            },
            error: (err) => {
                this.log.error({
                    objectId: id,
                    err,
                    callId
                }, '.get(id), emitted error!');
            }
        }));
    }
    getCurrent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            const obj = yield this.Model.findById(this.getObjectId(id))
                .lean()
                .exec();
            return this.parse(obj);
        });
    }
    getMultiple(ids) {
        const callId = uuid_1.v1();
        return of_1.of(null).pipe(operators_1.concat(this.existence.pipe(operators_1.filter((event) => _.includes(ids, event.id)), operators_1.share())), operators_1.exhaustMap(() => this.getCurrentMultiple(ids)), operators_1.tap({
            next: (objects) => {
            },
            error: (err) => {
                this.log.error({ objectIds: ids, err, callId }, '.getMultiple(ids), emitted error!');
            }
        }));
    }
    getCurrentMultiple(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            const objs = yield this.Model.find({
                _id: {
                    $in: _.map(ids, (id) => this.getObjectId(id))
                }
            })
                .lean()
                .exec();
            return _.map(objs, (obj) => this.parse(obj));
        });
    }
    createMultiple(createObjectList) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let arrayList;
            try {
                const documentList = yield this.Model.create(createObjectList);
                arrayList = documentList.map(doc => this.parse(doc.toObject()));
            }
            catch (error) {
                this.log.error({ callId, createObjectList, error }, '.createMultiple(createObjectList) thrown error!');
                throw error;
            }
            return arrayList;
        });
    }
    create(createObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let object;
            try {
                const document = yield this.Model.create(createObject);
                object = this.parse(document.toObject());
            }
            catch (error) {
                this.log.error({ callId, createObject, error }, '.create(createObject) thrown error!');
                throw error;
            }
            this.existence.next({
                id: object.id,
                value: object,
                lastValue: null,
                type: existence_1.ExistenceEventType.Created
            });
            return object;
        });
    }
    removeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            try {
                yield this.Model.remove({}).exec();
            }
            catch (err) {
                this.log.error({ callId, err }, '.removeAll() thrown error!');
                throw err;
            }
        });
    }
    remove(objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let lastValue;
            try {
                const lastValueRaw = (yield this.Model.findByIdAndRemove(objectId)
                    .lean()
                    .exec());
                lastValue = this.parse(lastValueRaw);
            }
            catch (err) {
                this.log.error({ callId, objectId, err }, '.remove(objectId) thrown error!');
                throw err;
            }
            if (lastValue == null) {
                throw new Error(".remove(objectId) error - Object don't exist");
            }
            else {
                this.existence.next({
                    id: objectId,
                    value: null,
                    lastValue,
                    type: existence_1.ExistenceEventType.Removed
                });
            }
        });
    }
    removeMultiple(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let lastValues;
            try {
                lastValues = yield this.find(conditions);
                yield this.Model.deleteMany({
                    _id: { $in: lastValues.map((o) => this.getObjectId(o.id)) }
                }).exec();
            }
            catch (err) {
                this.log.error({ callId, conditions, err }, '.removeMultiple(conditions) thrown error!');
                throw err;
            }
            _.each(lastValues, (lastValue) => {
                this.existence.next({
                    id: lastValue.id,
                    lastValue,
                    value: null,
                    type: existence_1.ExistenceEventType.Removed
                });
            });
        });
    }
    removeMultipleByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Model.updateMany({
                _id: { $in: ids.map((id) => this.getObjectId(id)) }
            }, { isDeleted: true }).exec();
        });
    }
    find(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let results;
            try {
                const documents = (yield this.Model.find(conditions == null ? {} : conditions)
                    .lean()
                    .exec());
                results = _.map(documents, (obj) => this.parse(obj));
            }
            catch (err) {
                this.log.error({ callId, conditions, err }, '.find(conditions) thrown error!');
                throw err;
            }
            return results;
        });
    }
    findAndGetSelectedFields(conditions, selectFields = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let results;
            try {
                const documents = (yield this.Model.find(conditions == null ? {} : conditions, selectFields == null ? {} : selectFields)
                    .lean()
                    .exec());
                results = _.map(documents, (obj) => this.parse(obj));
            }
            catch (err) {
                this.log.error({ callId, conditions, selectFields, err }, '.findAndGetSelectedFields(conditions, selectFields) thrown error!');
                throw err;
            }
            return results;
        });
    }
    findOne(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let result;
            try {
                const obj = (yield this.Model.findOne(conditions)
                    .lean()
                    .exec());
                result = this.parse(obj);
            }
            catch (err) {
                this.log.error({ callId, conditions, err }, '.findOne(conditions) thrown error!');
                throw err;
            }
            return result;
        });
    }
    update(objectId, updateObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let beforeUpdateObject;
            let updatedObject;
            try {
                beforeUpdateObject = yield this.getCurrent(objectId);
                if (beforeUpdateObject != null) {
                    const obj = (yield this.Model.findByIdAndUpdate(objectId, updateObj, { new: true })
                        .lean()
                        .exec());
                    updatedObject = this.parse(obj);
                }
                else {
                    throw new Error(`There is no such object with the id ${beforeUpdateObject}`);
                }
            }
            catch (err) {
                this.log.error({ callId, objectId, updateObj, err }, '.update(objectId, updateObj) thrown error!');
                throw err;
            }
            this.existence.next({
                id: objectId,
                value: updatedObject,
                lastValue: beforeUpdateObject,
                type: existence_1.ExistenceEventType.Updated
            });
            return updatedObject;
        });
    }
    updateMultiple(findObj, updateObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let lastValues;
            let updatedObjects;
            try {
                lastValues = yield this.find(findObj);
                yield this.Model.updateMany(findObj, updateObj, {
                    new: true
                }).exec();
                updatedObjects = yield this.getCurrentMultiple(_.map(lastValues, (value) => value.id));
            }
            catch (err) {
                this.log.error({ callId, findObj, updateObj, err }, '.updateMultiple(findObj, updateObj) thrown error!');
                throw err;
            }
            _.each(lastValues, (lastValue) => {
                const newValue = _.find(updatedObjects, (obj) => obj.id === lastValue.id);
                this.existence.next({
                    id: lastValue.id,
                    lastValue,
                    value: newValue,
                    type: existence_1.ExistenceEventType.Updated
                });
            });
            return updatedObjects;
        });
    }
    updateMultipleByIds(ids, updateObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let updatedObjects;
            try {
                updatedObjects = yield this.updateMultiple({
                    _id: {
                        $in: _.map(ids, (id) => new mongoose.Types.ObjectId(id))
                    }
                }, updateObj);
            }
            catch (err) {
                this.log.error({ callId, ids, updateObj, err }, '.updateMultipleByIds(ids, updateObj) thrown error!');
                throw err;
            }
            return updatedObjects;
        });
    }
    count(findObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let count;
            try {
                count = (yield this.Model.countDocuments(findObj).exec());
            }
            catch (err) {
                this.log.error({ callId, findObj, err }, '.countDocuments(findObj) thrown error!');
                throw err;
            }
            return count;
        });
    }
    countByAggregate(findObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const callId = uuid_1.v1();
            let count;
            try {
                count = (yield this.Model.aggregate([
                    { $match: findObj },
                    { $count: 'totalCount' }
                ]).then(res => {
                    if (res.length > 0)
                        return res[0].totalCount;
                    return 0;
                }));
            }
            catch (err) {
                this.log.error({ callId, findObj, err }, '.countByAggregate(findObj) thrown error!');
                throw err;
            }
            return count;
        });
    }
    findAll(selectFields = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Model.find({})
                .select(selectFields)
                .lean()
                .exec();
        });
    }
};
DBService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DBService);
exports.DBService = DBService;
//# sourceMappingURL=db-service.js.map