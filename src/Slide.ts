import { Timeout } from './Timeout.js';

export class Slide {
  private classActive = 'active';

  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;
  timeout: Timeout | null;

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
    this.timeout = null;

    this.init();
  }

  hide(slide: Element) {
    slide.classList.remove(this.classActive);
  }

  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    this.slides.forEach((slide) => this.hide(slide));
    this.slides[index].classList.add(this.classActive);
    this.auto(this.time);
  }

  auto(time: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);
    // const id = setTimeout(() => this.next(), time);
    // clearTimeout();
  }

  prev() {
    const prev = this.index - 1 < 0 ? this.slides.length - 1 : this.index - 1;
    this.show(prev);
  }
  next() {
    const next = this.index + 1 >= this.slides.length ? 0 : this.index + 1;
    this.show(next);
  }

  private addControls() {
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Slide Anterior';
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Próximo Slide';

    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    nextButton.addEventListener('pointerup', () => this.next());
    prevButton.addEventListener('pointerup', () => this.prev());
  }

  private init() {
    this.addControls();
    this.show(this.index);
  }
}
