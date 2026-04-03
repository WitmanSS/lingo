import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private redis: Redis;

  constructor(private configService: AppConfigService) {
    this.redis = new Redis(this.configService.getRedisUrl());
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.setex(key, ttl, value);
    } else {
      await this.redis.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  async incr(key: string): Promise<number> {
    return this.redis.incr(key);
  }

  async expire(key: string, ttl: number): Promise<void> {
    await this.redis.expire(key, ttl);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return this.redis.hget(key, field);
  }

  async hset(key: string, field: string, value: string): Promise<void> {
    await this.redis.hset(key, field, value);
  }

  async hdel(key: string, field: string): Promise<void> {
    await this.redis.hdel(key, field);
  }

  // --- Sorted Sets (Leaderboards) ---
  async zadd(key: string, score: number, member: string): Promise<void> {
    await this.redis.zadd(key, score, member);
  }

  async zrevrange(key: string, start: number, stop: number, withScores = false): Promise<string[]> {
    if (withScores) {
      return this.redis.zrevrange(key, start, stop, 'WITHSCORES');
    }
    return this.redis.zrevrange(key, start, stop);
  }

  async zrevrank(key: string, member: string): Promise<number | null> {
    return this.redis.zrevrank(key, member);
  }

  async zscore(key: string, member: string): Promise<string | null> {
    return this.redis.zscore(key, member);
  }

  // Allow raw instance access for complex pipelines
  getClient(): Redis {
    return this.redis;
  }
}
