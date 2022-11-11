import { Counter } from './counter.mjs';

export class MemoryCounter implements Counter {
    private value = 0;

    increment = () => {
        return new Promise<number>((resolve, reject) => {
            resolve(++this.value);
        });
    };

    async reset() {
        this.value = 0;
    }

    init = async () => true;
}
