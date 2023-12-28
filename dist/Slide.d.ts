export declare class Slide {
    private classActive;
    container: Element;
    slides: Element[];
    controls: Element;
    time: number;
    index: number;
    slide: Element;
    constructor(container: Element, slides: Element[], controls: Element, time?: number);
    hide(slide: Element): void;
    show(index: number): void;
}
