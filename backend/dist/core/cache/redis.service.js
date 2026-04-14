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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const config_service_1 = require("../config/config.service");
let RedisService = class RedisService {
    configService;
    redis;
    constructor(configService) {
        this.configService = configService;
        this.redis = new ioredis_1.default(this.configService.getRedisUrl());
    }
    getClient() {
        return this.redis;
    }
    async zrevrange(key, start, stop, withScores) {
        if (withScores) {
            return this.redis.zrevrange(key, start, stop, 'WITHSCORES');
        }
        return this.redis.zrevrange(key, start, stop);
    }
    async incrby(key, amount) {
        return this.redis.incrby(key, amount);
    }
    pipeline() {
        return this.redis.pipeline();
    }
    async onModuleDestroy() {
        await this.redis.quit();
    }
    async get(key) {
        return this.redis.get(key);
    }
    async set(key, value, ttl) {
        if (ttl) {
            await this.redis.setex(key, ttl, value);
        }
        else {
            await this.redis.set(key, value);
        }
    }
    async del(key) {
        await this.redis.del(key);
    }
    async exists(key) {
        const result = await this.redis.exists(key);
        return result === 1;
    }
    async incr(key) {
        return this.redis.incr(key);
    }
    async expire(key, ttl) {
        await this.redis.expire(key, ttl);
    }
    async hget(key, field) {
        return this.redis.hget(key, field);
    }
    async hset(key, field, value) {
        await this.redis.hset(key, field, value);
    }
    async hdel(key, field) {
        await this.redis.hdel(key, field);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.AppConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map