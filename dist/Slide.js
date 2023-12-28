import { Timeout } from './Timeout.js';
export class Slide {
    classActive = 'active';
    container;
    slides;
    controls;
    time;
    index;
    slide;
    timeout;
    constructor(container, slides, controls, time = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.index = 0;
        this.slide = this.slides[this.index];
        this.timeout = null;
        this.init();
    }
    hide(slide) {
        slide.classList.remove(this.classActive);
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        this.slides.forEach((slide) => this.hide(slide));
        this.slides[index].classList.add(this.classActive);
        this.auto(this.time);
    }
    auto(time) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }
    prev() {
        const prev = this.index - 1 < 0 ? this.slides.length - 1 : this.index - 1;
        this.show(prev);
    }
    next() {
        const next = this.index + 1 >= this.slides.length ? 0 : this.index + 1;
        this.show(next);
    }
    addControls() {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Slide Anterior';
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Próximo Slide';
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        nextButton.addEventListener('pointerup', () => this.next());
        prevButton.addEventListener('pointerup', () => this.prev());
    }
    init() {
        this.addControls();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map