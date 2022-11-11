import { MemoryCounter } from './memoryCounter.mjs';
import { RedisCounter } from './redisCounter.mjs';
import { Counter } from './counter.mjs';


export class CounterFactory {
    static async create(): Promise<Counter> {
        let counter: Counter = new RedisCounter();

        // Try to connect to Redis. If it fails, use
        // the in-memory counter instead.
        if (!await counter.init()) {
            counter = new MemoryCounter();
            await counter.init();
        }

        return counter;
    }
}
