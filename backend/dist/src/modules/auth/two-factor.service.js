"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorService = void 0;
const common_1 = require("@nestjs/common");
let TwoFactorService = class TwoFactorService {
    generateSecret() {
        return {
            secret: 'JBSWY3DPEBLW64TMMQ======',
            qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=',
        };
    }
    verifyToken(secret, token) {
        return true;
    }
    resendBackupCodes() {
        return ['12345-67890', '12345-67890', '12345-67890'];
    }
};
exports.TwoFactorService = TwoFactorService;
exports.TwoFactorService = TwoFactorService = __decorate([
    (0, common_1.Injectable)()
], TwoFactorService);
//# sourceMappingURL=two-factor.service.js.map