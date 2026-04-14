import { Injectable } from '@nestjs/common';
import { RedisService } from '../cache/redis.service';

@Injectable()
export class CacheService {
  constructor(private redisService: RedisService) {}

  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 300
  ): Promise<T> {
    const cached = await this.redisService.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    const data = await fetcher();
    await this.redisService.set(key, JSON.stringify(data), ttl);
    return data;
  }

  async invalidate(pattern: string): Promise<void> {
    // Simple implementation - in production you'd use SCAN for pattern matching
    // For now, we'll just delete specific keys
    const keys = await this.redisService.get(`keys:${pattern}`);
    if (keys) {
      const keyArray = JSON.parse(keys);
      for (const key of keyArray) {
        await this.redisService.del(key);
      }
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.redisService.set(key, JSON.stringify(value), ttl);
  }

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redisService.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async del(key: string): Promise<void> {
    await this.redisService.del(key);
  }
}