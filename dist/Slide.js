export class Slide {
    classActive = 'active';
    container;
    slides;
    controls;
    time;
    index;
    slide;
    constructor(container, slides, controls, time = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.index = 0;
        this.slide = this.slides[this.index];
        this.show(this.index);
    }
    hide(slide) {
        slide.classList.remove(this.classActive);
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        this.slides.forEach((slide) => this.hide(slide));
        this.slides[index].classList.add(this.classActive);
    }
}
//# sourceMappingURL=Slide.js.map