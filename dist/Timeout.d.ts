export declare class Timeout {
    id: number;
    handler: TimerHandler;
    constructor(handler: TimerHandler, time: number);
    clear(): void;
}
