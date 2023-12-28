import { Timeout } from './Timeout.js';
export declare class Slide {
    private classActive;
    container: Element;
    slides: Element[];
    controls: Element;
    time: number;
    index: number;
    slide: Element;
    timeout: Timeout | null;
    constructor(container: Element, slides: Element[], controls: Element, time?: number);
    hide(slide: Element): void;
    show(index: number): void;
    auto(time: number): void;
    prev(): void;
    next(): void;
    private addControls;
    private init;
}
