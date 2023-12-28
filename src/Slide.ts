import { Timeout } from './Timeout.js';

export class Slide {
  private classActive = 'active';
  private classPaused = 'paused';

  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element;
  timeout: Timeout | null;
  pausedTimeout: Timeout | null;
  paused: boolean;
  thumbItems: HTMLElement[] | null;
  thumb: HTMLElement | null;

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
    this.index = localStorage.getItem('activeSlide')
      ? Number(localStorage.getItem('activeSlide'))
      : 0;
    this.slide = this.slides[this.index];
    this.timeout = null;
    this.pausedTimeout = null;
    this.paused = false;
    this.thumbItems = null;
    this.thumb = null;

    this.init();
  }

  hide(slide: Element) {
    slide.classList.remove(this.classActive);
    if (slide instanceof HTMLVideoElement) {
      slide.pause();
      slide.currentTime = 0;
    }
  }

  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    localStorage.setItem('activeSlide', String(this.index));

    if (this.thumbItems) {
      this.thumb = this.thumbItems[this.index];
      this.thumbItems.forEach((thumb) => this.hide(thumb));
      this.thumb?.classList.add(this.classActive);
    }

    this.slides.forEach((slide) => this.hide(slide));
    this.slides[index].classList.add(this.classActive);

    if (this.slide instanceof HTMLVideoElement) {
      this.autoVideo(this.slide);
    } else {
      this.auto(this.time);
    }
  }

  autoVideo(video: HTMLVideoElement) {
    video.muted = true;
    video.play();
    let firstPlay = true;
    video.addEventListener('playing', () => {
      if (firstPlay) this.auto(video.duration * 1000);
      firstPlay = false;
    });
  }

  auto(time: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);

    if (this.thumb) this.thumb.style.animationDuration = `${time}ms`;

    // const id = setTimeout(() => this.next(), time);
    // clearTimeout();
  }

  pause() {
    document.body.classList.add(this.classPaused);

    this.pausedTimeout = new Timeout(() => {
      this.paused = true;
      this.thumb?.classList.add(this.classPaused);
      if (this.slide instanceof HTMLVideoElement) {
        this.slide.pause();
      }
    }, 300);
  }

  continue() {
    document.body.classList.add(this.classPaused);

    this.pausedTimeout?.clear();
    if (this.paused) {
      this.paused = false;
      this.timeout?.continue();
      this.thumb?.classList.remove(this.classPaused);
      if (this.slide instanceof HTMLVideoElement) {
        this.slide.play();
      }
    }
  }

  prev() {
    if (this.paused) return;
    const prev = this.index - 1 < 0 ? this.slides.length - 1 : this.index - 1;
    this.show(prev);
  }
  next() {
    if (this.paused) return;
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

    this.controls.addEventListener('pointerdown', () => this.pause());
    document.addEventListener('pointerup', () => this.continue());
    document.addEventListener('touchend', () => this.continue());

    nextButton.addEventListener('pointerup', () => this.next());
    prevButton.addEventListener('pointerup', () => this.prev());
  }

  private addThumbItems() {
    const thumbContainer = document.createElement('div');
    thumbContainer.id = 'slide-thumb';

    for (let i = 0; i < this.slides.length; i++) {
      thumbContainer.innerHTML += `
      <span>
        <span class="thumb-item"></span>
      </span>
      `;
    }

    this.controls.appendChild(thumbContainer);
    this.thumbItems = Array.from(document.querySelectorAll('.thumb-item'));
  }

  private init() {
    this.addControls();
    this.addThumbItems();
    this.show(this.index);
  }
}
