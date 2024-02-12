// cacheService.ts
import { redisClient } from '../store/redis/redis.client';

export class CacheService {
    static async getFromCache(key: string): Promise<string | null> {
        try {
            const data = await redisClient.get(key);
            return data;
        } catch (error) {
            console.error('Error fetching from cache:', error);
            throw error;
        }
    }

    static async setToCache(key: string, value: string, expiry: number = 3600): Promise<void> {
        try {
            await redisClient.set(key, value, 'EX', expiry);
        } catch (error) {
            console.error('Error setting cache:', error);
            throw error;
        }
    }

    static async deleteFromCache(key: string): Promise<void> {
        try {
            await redisClient.del(key);
        } catch (error) {
            console.error('Error deleting from cache:', error);
            throw error;
        }
    }
}
