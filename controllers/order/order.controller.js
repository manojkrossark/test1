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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const OrderDto_1 = require("./OrderDto");
const orders_1 = require("../../services/orders");
const FetchhOrderStatus_1 = require("@modules/server.common/enums/FetchhOrderStatus");
let OrderController = class OrderController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    updateOrderStatus(updateInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fetchhOrderStatus = this.stringToFetchhOrderStatus(updateInfo.fetchhStatusCode);
                const order = yield this.ordersService.updateOrderStatusFromFetchh(updateInfo, fetchhOrderStatus);
                return order;
            }
            catch (error) {
                throw error;
            }
        });
    }
    stringToFetchhOrderStatus(fetchhStatus) {
        switch (fetchhStatus) {
            case "0":
                return FetchhOrderStatus_1.default.UnAssigned;
            case "1":
                return FetchhOrderStatus_1.default.ExecutivePending;
            case "2":
                return FetchhOrderStatus_1.default.Assigned;
            case "3":
                return FetchhOrderStatus_1.default.PackageReceived;
            case "4":
                return FetchhOrderStatus_1.default.NextDelivery;
            case "5":
                return FetchhOrderStatus_1.default.OutForDelivery;
            case "6":
                return FetchhOrderStatus_1.default.Delivered;
            case "7":
                return FetchhOrderStatus_1.default.DeliverLater;
            case "8":
                return FetchhOrderStatus_1.default.ReturnToHub;
            case "9":
                return FetchhOrderStatus_1.default.Misc;
            default:
                return FetchhOrderStatus_1.default.UnAssigned;
        }
    }
};
__decorate([
    common_1.Put('updateOrderStatus'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderDto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatus", null);
OrderController = __decorate([
    swagger_1.ApiUseTags('order'),
    common_1.Controller('order'),
    __metadata("design:paramtypes", [orders_1.OrdersService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map