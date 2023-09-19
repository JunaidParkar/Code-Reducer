const gsap = require("gsap").gsap
const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger

class CanvasLoader {
  constructor(canvasElement, frames, percentToScroll) {
    this.canvas = canvasElement;
    this.frames = frames;
    this.ctx = this.canvas.getContext('2d');
    this.frame = 0;
    this.scrollEnd = percentToScroll;
    this.images = [];
    this.animation = undefined
  }

  preloadImages(frames) {
    return Promise.all(
      frames.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            this.images.push(img);
            resolve();
          };
          img.onerror = reject;
          img.src = src;
        });
      })
    );
  }

  createCanvas() {
    this.resizeCanvas();
    this.drawFrame(this.frame);
    window.addEventListener('resize', this.debounce(() => {
      this.resizeCanvas();
      this.drawFrame(Math.floor(this.frame));
    }, 250));

    // Store a reference to the animation
    this.animation = gsap.to(this, {
      frame: this.frames.length - 1,
      scrollTrigger: {
        trigger: this.canvas.parentElement,
        pin: true,
        scrub: 1,
        start: `top top`,
        end: `${this.scrollEnd}% top`,
      },
      onUpdate: () => this.drawFrame(Math.floor(this.frame))
    });
  }

  drawFrame(frameIndex) {
    let img = this.images[frameIndex];
    let scale = Math.min(this.canvas.width / img.width, this.canvas.height / img.height);
    let x = (this.canvas.width - img.width * scale) / 2;
    let y = (this.canvas.height - img.height * scale) / 2;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = this.canvas.parentElement.offsetHeight;
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  async init() {
    return this.preloadImages(this.frames).then(() => {
      gsap.registerPlugin(ScrollTrigger);
      this.createCanvas();
      return Promise.resolve();
    });
  }

  revert() {
    if (this.animation) {
      this.animation.revert();
    }
  }
}

module.exports = CanvasLoader;
