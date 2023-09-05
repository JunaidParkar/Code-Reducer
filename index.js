const scripts = require("./data/script");

/**
  * The base class for myJs library
  * This library can create wonderful stuffs and can reduce your code length
  * It can create custom cursor with magnetic effect as you want (Customizable)
  * For source code visit
*/


class myJS {
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
        }console.log(magneticHoverSize)
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
}

/**
 * @module myJS
 * @type {myJS}
 */

module.exports = myJS;
