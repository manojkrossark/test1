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
require("jest");
const inversify_config_1 = require("../../services/inversify.config");
const geo_locations_1 = require("../../services/geo-locations");
const faker = require("faker");
const ForwardOrdersMethod_1 = require("@modules/server.common/enums/ForwardOrdersMethod");
const GeoLocation_1 = require("@modules/server.common/entities/GeoLocation");
const warehouses_1 = require("../../services/warehouses");
const bson_1 = require("bson");
const mongoose = require("mongoose");
const env_1 = require("../../env");
const Rx_1 = require("rxjs/Rx");
const utils_1 = require("@modules/server.common/utils");
const promoGSTConfigurationMethod_1 = require("@modules/server.common/enums/promoGSTConfigurationMethod");
jest.setTimeout(30000);
process.env.NODE_ENV = 'test';
function geoLocationFixture([lng, lat]) {
    return new GeoLocation_1.default({
        _id: new bson_1.ObjectID().toHexString(),
        _createdAt: new Date(),
        _updatedAt: new Date(),
        city: faker.address.city(),
        postcode: faker.address.zipCode(),
        streetAddress: faker.address.streetAddress(),
        house: faker.random.number(199).toString(),
        countryId: faker.random.number(1),
        loc: {
            type: 'Point',
            coordinates: [lng, lat]
        }
    });
}
function warehouseFixture([lng, lat]) {
    const warehouseName = faker.company.companyName();
    return {
        password: faker.internet.password(),
        warehouse: {
            name: `Restaurant ${warehouseName}`,
            isActive: true,
            username: faker.internet.userName(),
            logo: utils_1.getPlaceholditImgix(500, 500, 80, warehouseName),
            contactEmail: faker.internet.email(),
            contactPhone: faker.phone.phoneNumber(),
            landLine: faker.phone.phoneNumber(),
            ordersEmail: null,
            ordersPhone: null,
            forwardOrdersUsing: [ForwardOrdersMethod_1.default.Unselected],
            isManufacturing: true,
            isCarrierRequired: true,
            usedCarriersIds: [],
            geoLocation: geoLocationFixture([lng, lat]),
            gstIn: faker.random.number().toString(),
            tenantId: "T00002",
            radius: 0,
            openingTime: '',
            closingTime: '',
            roles: [],
            promoGSTConfiguration: promoGSTConfigurationMethod_1.default.BeforeTax
        }
    };
}
describe('GeoLocationWarehouses', () => {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const mongoUrl = env_1.env.TESTING_DB_URI;
        mongoose.Promise = Promise;
        const options = {
            auto_reconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000
        };
        yield mongoose.connect(mongoUrl, options);
        console.log(`MongoDB successfully connected to ${mongoUrl}`);
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        inversify_config_1.servicesContainer.snapshot();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        for (const collection of Object.values(mongoose.connection.collections)) {
            yield collection.drop();
        }
        inversify_config_1.servicesContainer.restore();
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield mongoose.disconnect();
    }));
    describe('.get(conditions)', () => {
        const geoLocationsWarehousesService = inversify_config_1.servicesContainer.get(geo_locations_1.GeoLocationsWarehousesService);
        const warehousesService = inversify_config_1.servicesContainer.get(warehouses_1.WarehousesService);
        it('Finds nearby warehouses and tracks their changes', () => __awaiter(this, void 0, void 0, function* () {
            const coordinates = [10, 10];
            const geoLocation = geoLocationFixture(coordinates);
            const testScheduler = new Rx_1.TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });
        }));
    });
});
//# sourceMappingURL=GeoLocationWarehouses.spec.js.map