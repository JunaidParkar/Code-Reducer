const scripts = require("./data/script");
const jwt = require("jsonwebtoken")

/**
  * The base class for codeReducer library
  * This library can create wonderful stuffs and can reduce your code length
  * It can create custom cursor with magnetic effect as you want (Customizable)
  * For source code visit
*/


class codeReducer {
  constructor() {
    this.scr = new scripts();
  }

  getCursor(
    crsrColor = "black",
    {
      setMagnet = false,
      elementId = [],
      treble = 0.5,
      magneticHoverSize = 10
    } = {}
  ) {
    document.body.style.cursor = "none"
    const crsr = document.createElement("div");
    crsr.id = "myCursor10011";
    crsr.style.background = crsrColor;
    document.body.appendChild(crsr);
    document.addEventListener("mousemove", (e) => {
      crsr.style.left = `${e.clientX}px`;
      crsr.style.top = `${e.clientY}px`;
      if (setMagnet) {
        if(elementId.length <= 0) {
          console.error("Element ID not provided")
        } else if((treble < 0) || (treble > 1)) {
          console.error("Treble should be between 0 to 1")
        } else {
          for (let i = 0; i < elementId.length; i++) {
            if (!document.getElementById(elementId[i])) {
              console.error(`No element with id ${elementId[i]} found`)
              break
            }
          }
        }
        let isId = true
        for (let i = 0; i < elementId.length; i++) {
          if(!document.getElementById(elementId[i])){
            console.error(`Unable to find element with id ${elementId[i]}`)
            isId = false
            break
          }
        }
        if (!isId) {
          return
        }
        this.scr.cursorMagnet(
          elementId,
          crsr,
          e.clientX,
          e.clientY,
          treble,
          magneticHoverSize
        );
      }
    });
  }

  getCaptcha(captcha) {
    let c = this.scr.createCaptcha()
    let s = this.scr.createSequence()
    let t = this.scr.createToken({c, s})
    captcha(s.join(" "), c.join(" "), t)
  }

  verifyToken(sequence, captcha, token, input, result) {}
}

/**
 * @module codeReducer
 * @type {codeReducer}
 */

module.exports = codeReducer;
