import * as redis from 'redis';
import { Counter } from './counter.mjs';

export class RedisCounter implements Counter {

    private static readonly KEY = "views";
    private client;

    constructor() {
        this.client = redis.createClient({
            socket: {
                host: 'redis-stack',
                port: 6379
            }
        });
    }

    async init() {
        try {
            await this.client.connect();
            return (await this.client.ping() === "PONG");
        }
        catch {
            return false;
        }
    }

    async increment() {
        return await this.client.incr(RedisCounter.KEY);
    }

    async reset() {
        await this.client.set(RedisCounter.KEY, 0);
    }
}
