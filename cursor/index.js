import gsap from "gsap";
import { Power2 } from "gsap";

class customCursor {
  constructor(cursor, custom = false, mediaSize = "520px") {
    this.cursor = cursor;
    this.custom = custom;
    this.magnetElement = [];
    this.isMagnetActive = false;
    this.mediaSize = mediaSize;
    this.toPerform = null
    window.onresize(() => {
      if (window.innerWidth < this.mediaSize) {
        if (this.cursor) {
          this.cursor.style.display = "none"
        }
        this.toPerform = null
      }
    })
    if (window.innerWidth < this.mediaSize) {this.toPerform = null} else this.toPerform = true
  }
  lerp(x, y, a) {
    return x * (1 - a) + y * a;
  }
  createCursor() {
    if (this.cursor) {
      this.cursor.style.setProperty("all", "unset");
      this.cursor.style.zIndex = 999999999999;
      this.cursor.style.background = "white";
      this.cursor.style.height = "20px";
      this.cursor.style.width = "20px";
      this.cursor.style.borderRadius = "50%";
      this.cursor.style.mixBlendMode = "difference";
      this.cursor.style.position = "fixed";
      this.cursor.style.pointerEvents = "none";
      this.cursor.style.scale = 1;
    }
  }
  moveCursor(e) {
    if (this.cursor) {
      gsap.to(this.cursor, {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        duration: 1,
        ease: Power2.easeOut,
      });
      this.cursor.style.left = `${e.clientX}px`;
      this.cursor.style.top = `${e.clientY}px`;
    }
  }

  magneticEffect(e) {
    for (let refs of this.magnetElement) {
      let g = refs.getBoundingClientRect();
      let toMagnetize =
        e.clientX >= g.left &&
        e.clientX <= g.right &&
        e.clientY >= g.top &&
        e.clientY <= g.bottom;
      if (toMagnetize) {
        this.isMagnetActive = refs;
        break;
      }
    }
    if (this.isMagnetActive) {
      let g = this.isMagnetActive.getBoundingClientRect();
      let x = gsap.utils.mapRange(0, g.width, 0, 1, e.clientX - g.left);
      let y = gsap.utils.mapRange(0, g.height, 0, 1, e.clientY - g.top);
      gsap.to(this.isMagnetActive, {
        x: this.lerp(-50, 50, x),
        y: this.lerp(-50, 50, y),
        duration: 1,
        ease: Power2.easeOut,
      });
      gsap.to(".bui3o87r3r78ry3", {
        scale: 4,
        duration: 1,
        ease: Power2.easeOut,
      });
      this.isMagnetActive = null;
    }
    this.magnetElement.forEach((refs) => {
      gsap.to(refs, {
        x: 0,
        y: 0,
        duration: 1,
        ease: Power2.easeOut,
      });
      gsap.to(".bui3o87r3r78ry3", {
        scale: 1,
        duration: 1,
        ease: Power2.easeOut,
      });
    });
  }

  makeMagnet(refArray) {
    if (this.toPerform) {
      if (refArray.length > 0) {
        refArray.forEach((refs) => {
          if (refs) {
            this.magnetElement.includes(refs)
              ? ""
              : this.magnetElement.push(refs);
          }
        });
        document.addEventListener("mousemove", (e) => this.magneticEffect(e));
      } else {
        console.warn("No Element passed for magnetic effect");
      }
    } else {
      console.warn("Custom cursor not found on this page");
    }
  }
  getCursor() {
    if (this.cursor && this.toPerform) {
      if (!this.custom) {
        this.createCursor();
      }
      this.cursor ? (this.cursor.style.opacity = 0) : "";
      this.cursor ? this.cursor.classList.add("bui3o87r3r78ry3") : "";
      document.body.style.cursor = "none";
      document.addEventListener("mouseenter", () =>
        this.cursor ? (this.cursor.style.opacity = 1) : ""
      );
      document.addEventListener("mousemove", (e) => {
        this.moveCursor(e);
      });
      document.addEventListener("mouseleave", () =>
        this.cursor ? (this.cursor.style.opacity = 0) : ""
      );
    }
    document.body.style.cursor = "default"
  }
  revert() {
    document.body.style.cursor = "auto";
    document.removeEventListener("mouseenter", () =>
      this.cursor ? (this.cursor.style.opacity = 1) : ""
    );
    document.removeEventListener("mousemove", (e) => {
      this.moveCursor(e);
    });
    document.removeEventListener("mouseleave", () =>
      this.cursor ? (this.cursor.style.opacity = 0) : ""
    );
    this.magnetElement = [];
    document.removeEventListener("mousemove", (e) => this.magneticEffect(e));
    this.isMagnetActive = null;
  }
}

export default customCursor;
