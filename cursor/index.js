import gsap from "gsap";
import { Power2 } from "gsap";

class customCursor {
    constructor(cursor, custom = false, mediaSize = 520) {
        this.cursor = cursor;
        this.custom = custom;
        this.mediaSize = mediaSize;
        this.magnetElement = [];
        this.isMagnetActive = null;
        this.toPerform = window.innerWidth >= this.mediaSize;
        this.handleResize = this.setPerformance.bind(this);
        this.handleMouseMove = this.moveCursor.bind(this);
        this.handleMagnetMove = this.magneticEffect.bind(this);
        window.addEventListener("resize", this.handleResize);
    }

    setPerformance() {
        if (window.innerWidth < this.mediaSize) {
            this.toPerform = false;
            if (this.cursor) {
                this.cursor.style.display = "none";
            }
            document.body.style.cursor = "auto";
        } else {
            this.toPerform = true;
            if (this.cursor) {
                this.cursor.style.display = "block";
            }
        }
    }

    lerp(x, y, a) {
        return x * (1 - a) + y * a;
    }

    createCursor() {
        if (!this.cursor) return;
        this.cursor.style.setProperty("all", "unset");
        this.cursor.style.position = "fixed";
        this.cursor.style.zIndex = "999999999999";
        this.cursor.style.width = "20px";
        this.cursor.style.height = "20px";
        this.cursor.style.background = "white";
        this.cursor.style.borderRadius = "50%";
        this.cursor.style.pointerEvents = "none";
        this.cursor.style.mixBlendMode = "difference";
        this.cursor.style.transform = "translate(-50%, -50%)";
    }

    moveCursor(e) {
        if (this.cursor) {
            console.log("moving 1");
            this.cursor.style.transform = "translateX(-50%) translateY(-50%)";
            gsap.to(this.cursor, {
                left: e.clientX,
                top: e.clientY,
                duration: 0.5,
                ease: Power2.easeOut,
                overwrite: true,
            });
        }
    }

    magneticEffect(e) {
        let activeElement = null;
        for (const refs of this.magnetElement) {
            const rect = refs.getBoundingClientRect();
            const inside =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;
            if (inside) {
                activeElement = refs;
                break;
            }
        }

        if (activeElement) {
            const rect = activeElement.getBoundingClientRect();
            const x = gsap.utils.mapRange(0, rect.width, 0, 1, e.clientX - rect.left);
            const y = gsap.utils.mapRange(0, rect.height, 0, 1, e.clientY - rect.top);
            gsap.to(activeElement, {
                x: this.lerp(-50, 50, x),
                y: this.lerp(-50, 50, y),
                duration: 0.4,
                ease: Power2.easeOut,
            });
            if (this.cursor) {
                gsap.to(this.cursor, {
                    scale: 4,
                    duration: 0.3,
                    ease: Power2.easeOut,
                });
            }
        } else {
            this.magnetElement.forEach((refs) => {
                gsap.to(refs, {
                    x: 0,
                    y: 0,
                    duration: 0.4,
                    ease: Power2.easeOut,
                });
            });
            if (this.cursor) {
                gsap.to(this.cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: Power2.easeOut,
                });
            }
        }
    }

    getCursor() {
        if (!this.cursor || !this.toPerform) return;
        if (!this.custom) {
            this.createCursor();
        }
        this.cursor.style.opacity = "1";
        document.body.style.cursor = "none";
        document.addEventListener("mousemove", this.handleMouseMove);
    }

    makeMagnet(refArray) {
        if (!this.toPerform) {
            console.warn("Custom cursor disabled on this screen size");
            return;
        }
        if (!Array.isArray(refArray) || refArray.length === 0) {
            console.warn("No element passed for magnetic effect");
            return;
        }
        refArray.forEach((ref) => {
            if (ref && !this.magnetElement.includes(ref)) {
                this.magnetElement.push(ref);
            }
        });
        document.addEventListener("mousemove", this.handleMagnetMove);
    }

    revert() {
        document.body.style.cursor = "auto";
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mousemove", this.handleMagnetMove);
        window.removeEventListener("resize", this.handleResize);
        this.magnetElement.forEach((refs) => {
            gsap.set(refs, {
                x: 0,
                y: 0,
            });
        });
        this.magnetElement = [];
        if (this.cursor) {
            gsap.killTweensOf(this.cursor);
            this.cursor.style.opacity = "";
            this.cursor.style.display = "";
        }
    }
}

export default customCursor;
