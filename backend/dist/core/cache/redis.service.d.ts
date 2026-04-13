import { OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { AppConfigService } from '../config/config.service';
export declare class RedisService implements OnModuleDestroy {
    private configService;
    private redis;
    constructor(configService: AppConfigService);
    onModuleDestroy(): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    incr(key: string): Promise<number>;
    expire(key: string, ttl: number): Promise<void>;
    hget(key: string, field: string): Promise<string | null>;
    hset(key: string, field: string, value: string): Promise<void>;
    hdel(key: string, field: string): Promise<void>;
    zadd(key: string, score: number, member: string): Promise<void>;
    zrevrange(key: string, start: number, stop: number, withScores?: boolean): Promise<string[]>;
    zrevrank(key: string, member: string): Promise<number | null>;
    zscore(key: string, member: string): Promise<string | null>;
    getClient(): Redis;
}
