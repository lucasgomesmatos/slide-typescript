export class Slide {
  private classActive = 'active';

  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;

  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000,
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.slides[this.index];

    this.show(this.index);
  }

  hide(slide: Element) {
    slide.classList.remove(this.classActive);
  }

  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    this.slides.forEach((slide) => this.hide(slide));
    this.slides[index].classList.add(this.classActive);
  }
}
