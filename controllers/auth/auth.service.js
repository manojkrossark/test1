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
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const User_1 = require("@modules/server.common/entities/User");
const Log_1 = require("../../helpers/Log");
const operators_1 = require("rxjs/operators");
const users_1 = require("../../services/users");
let AuthService = class AuthService {
    constructor(_usersService) {
        this._usersService = _usersService;
        this.DBObject = User_1.default;
        this.log = Log_1.createEverLogger({ name: 'authService' });
    }
    createToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = { id };
            return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
        });
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._usersService
                .get(payload.id)
                .pipe(operators_1.first())
                .toPromise();
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map