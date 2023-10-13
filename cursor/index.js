var gsap = require("gsap").gsap
var gsapAll = require("gsap/all")

class customCursor {
    constructor(cursor, custom = false) {
        this.cursor = cursor
        this.custom = custom
        this.magneticElements = []
    }
    lerp(x, y, a) {
        return x * (1 - a) + y * a
    }
    addMagnet(reference) {
        this.magneticElements.push(reference);
    }
    createCursor() {
        if (this.cursor) {
            this.cursor.style.setProperty("all", "unset")
            this.cursor.style.zIndex = 999999999999
            this.cursor.style.background = "white"
            this.cursor.style.height = '20px'
            this.cursor.style.width = '20px'
            this.cursor.style.borderRadius = '50%'
            this.cursor.style.mixBlendMode = 'difference'
            this.cursor.style.position = 'fixed'
            this.cursor.style.pointerEvents = 'none'
            this.cursor.style.scale = 1
        }
    }
    moveCursor(e) {
        if (this.cursor) {
            gsap.to(this.cursor, {
                    left: `${e.clientX}px`,
                    top: `${e.clientY}px`,
                    duration: 1,
                    ease: gsapAll.Expo.easeOut
                })
                // document.body.addEventListener("mouseover", () => {
                //     gsap.to(this.cursor, {
                //         scale: 1,
                //         duration: 1,
                //         ease: gsapAll.Expo.easeOut
                //     })
                // })
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
        }
    }
    magnetAnimateOnMove(dets, elem) {
        var bcr = elem.getBoundingClientRect()
        var zeroonex = gsap.utils.mapRange(
            0,
            bcr.width,
            0,
            1,
            dets.clientX - bcr.left
        )
        var zerooney = gsap.utils.mapRange(
            0,
            bcr.height,
            0,
            1,
            dets.clientY - bcr.top
        )
        gsap.to(document.querySelector(".bui3o87r3r78ry3"), {
            scale: 4,
            ease: gsapAll.Power2,
            duration: 0.5,
        })
        gsap.to(elem, {
            x: this.lerp(-20, 20, zeroonex),
            y: this.lerp(-20, 20, zerooney),
            duration: 1,
            ease: gsapAll.Expo.easeOut,
        })
    }
    magnetAnimateOnLeave(elem) {
        gsap.to(document.querySelector(".bui3o87r3r78ry3"), {
            scale: 1,
            ease: gsapAll.Power2,
            duration: 0.5,
        })
        gsap.to(elem, {
            x: 0,
            y: 0,
            duration: 1,
            ease: gsapAll.Expo.easeOut,
        })
    }
    makeMagnet() {
        // this.magneticElements.forEach(refs => {
        let activeID = false;
        for (let i = 0; i < this.magneticElements.length; i++) {
            this.magneticElements[i].style.transform = "";
        }
        for (let i = 0; i < this.magneticElements.length; i++) {
            if (this.magneticElements[i]) {
                let rect = this.magneticElements[i].getBoundingClientRect();
                let toMagnetize = cursorX >= rect.left && cursorX <= rect.right && cursorY >= rect.top && cursorY <= rect.bottom;
                if (toMagnetize) {
                    activeID = elementID[i];
                    break;
                } else {
                    toMagnetize = false;
                }
            }
        }
        for (let i = 0; i < this.magneticElements.length; i++) {
            if (this.magneticElements[i] == activeID) {
                let gbcl = this.magneticElements[i].getBoundingClientRect();
                let xAxis = cursorX - gbcl.left;
                let yAxis = cursorY - gbcl.top;
                this.magneticElements.style.transform = `translateX(${xAxis * treble}px) translateY(${yAxis * treble}px)`;
                break;
            }
        }
        if (document.getElementById(activeID)) {
            document.querySelector(".bui3o87r3r78ry3").style.transform = `scale(4)`;
        } else {
            document.querySelector(".bui3o87r3r78ry3").style.transform = "scale(1)";
        }
        // });
    }
    getCursor() {
        if (!this.custom) {
            this.createCursor()
        }
        this.cursor ? this.cursor.style.opacity = 0 : ""
        this.cursor ? this.cursor.classList.add("bui3o87r3r78ry3") : ""
        document.body.style.cursor = "none"
            // this.cursor.style.scale = 1
        document.addEventListener("mouseenter", () => this.cursor ? this.cursor.style.opacity = 1 : "")
        document.addEventListener("mousemove", (e) => { this.moveCursor(e) })
        document.addEventListener("mouseleave", () => this.cursor ? this.cursor.style.opacity = 0 : "")
    }
    revert() {
        // this.cursor = null
        // this.custom = false
        document.body.style.cursor = "auto"
            // document.querySelector(".bui3o87r3r78ry3").style.scale = 1
        document.removeEventListener("mouseenter", () => this.cursor ? this.cursor.style.opacity = 1 : "")
        document.removeEventListener("mousemove", (e) => { this.moveCursor(e) })
        document.removeEventListener("mouseleave", () => this.cursor ? this.cursor.style.opacity = 0 : "")
        this.magneticElements.forEach((elem) => {
            elem.removeEventListener("mousemove", (dets) => {
                this.magnetAnimateOnMove(dets, elem)
            })
            elem.removeEventListener("mouseleave", () => {
                this.magnetAnimateOnLeave(elem)
            })
        })
    }
}

module.exports = customCursor