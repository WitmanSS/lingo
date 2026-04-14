import { RedisService } from '../cache/redis.service';
export declare class CacheService {
    private redisService;
    constructor(redisService: RedisService);
    getOrSet<T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T>;
    invalidate(pattern: string): Promise<void>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    del(key: string): Promise<void>;
}
