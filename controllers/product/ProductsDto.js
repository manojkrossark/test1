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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
class UpdateProductDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
exports.UpdateProductDto = UpdateProductDto;
class CreateProductDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "commissionPercentage", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "commissionAmount", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "applyForProduct", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "applyTaxType", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "images", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "tenantId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isDocumentRequired", void 0);
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=ProductsDto.js.map