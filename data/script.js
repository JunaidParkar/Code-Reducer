/**
 * The base class for myJs library
 * This library can create wonderful stuffs and can reduce your code length
 * It can create custom cursor with magnetic effect as you want (Customizable)
 * For source code visit
 */

class scripts {
  cursorMagnet(
    elementID,
    crsr,
    cursorX,
    cursorY,
    treble,
    magneticSize,
  ) {
    let activeID = false;
    for (let i = 0; i < elementID.length; i++) {
      document.getElementById(elementID[i]).style.transform = "";
    }
    for (let i = 0; i < elementID.length; i++) {
      if (document.getElementById(elementID[i])) {
        let rect = document
          .getElementById(elementID[i])
          .getBoundingClientRect();
        let toMagnetize =
          cursorX >= rect.left &&
          cursorX <= rect.right &&
          cursorY >= rect.top &&
          cursorY <= rect.bottom;
        if (toMagnetize) {
          activeID = elementID[i];
          break;
        } else {
          toMagnetize = false;
        }
      }
    }
    for (let i = 0; i < elementID.length; i++) {
      if (elementID[i] == activeID) {
        let gbcl = document.getElementById(activeID).getBoundingClientRect();
        let xAxis = cursorX - gbcl.left;
        let yAxis = cursorY - gbcl.top;
        document.getElementById(activeID).style.transform = `translateX(${
          xAxis * treble
        }px) translateY(${yAxis * treble}px)`;
        break;
      }
    }
    if (document.getElementById(activeID)) {
      crsr.style.transform = `scale(${magneticSize})`;
    } else {
      crsr.style.transform = "scale(1)";
    }
  }
}

module.exports = scripts