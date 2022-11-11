export interface Counter {
    increment(): Promise<number>;
    reset(): Promise<void>;
    init(): Promise<boolean>;
}
