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
const ProductsDto_1 = require("./ProductsDto");
const passport_1 = require("@nestjs/passport");
const products_1 = require("../../services/products");
let ProductController = class ProductController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    findAll(request) {
        return this.productsService.find({});
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prod = yield this.productsService.getCurrent(id);
            return prod;
        });
    }
    create(createInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productsService.create(createInfo);
        });
    }
    update(id, updateInfo) {
        return `Here updates a #${id} product`;
    }
    remove(id) {
        return `Here removes a #${id} product`;
    }
};
__decorate([
    common_1.Get(),
    common_1.Header('Cache-Control', 'none'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    common_1.Post(':id'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductsDto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ProductsDto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    common_1.Delete('id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
ProductController = __decorate([
    swagger_1.ApiUseTags('product'),
    common_1.Controller('product'),
    __metadata("design:paramtypes", [products_1.ProductsService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map