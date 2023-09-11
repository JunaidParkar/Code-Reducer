const jwt = require("jsonwebtoken")

/**
 * NOT FOR YOUR USE. KINDLY DONT'T USE THIS CLASS
 */

class scripts {
  generateString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  generateToken(length) {
      let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomIndex);
      }
      let token = password.split(".").join();
      return token;
  }
  createToken(dataInJson) {
    let randomToken1 = this.generateToken(100);
    let randomToken2 = this.generateToken(100);
    let randomToken3 = this.generateToken(100);
    let randomToken4 = this.generateToken(100);
    let tk = jwt.sign(dataInJson, "BJ537MumEoT1Da0iBgi5ZF0w8ZFGXxq8", {
      expiresIn: "2m"
    });
    let tokenArry = tk.split(".");
    let token = `${randomToken1}.${tokenArry[0]}.${randomToken2}.${tokenArry[2]}.${randomToken3}.${tokenArry[1]}.${randomToken4}`;
    return token;
  };
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
  verifyToken(token) {
    try {
      let tokenList = token.split(".");
      if (tokenList.length != 7) {
        return [false, "Invalid token"]
      }
      let tokenPart0 = tokenList[1];
      let tokenPart1 = tokenList[3];
      let tokenPart2 = tokenList[5];
      try {
        const decoded = jwt.verify(`${tokenPart0}.${tokenPart2}.${tokenPart1}`, "BJ537MumEoT1Da0iBgi5ZF0w8ZFGXxq8");
        return [true, decoded];
      } catch (err) {
        return [false, err.name];
      }
    } catch (errors) {
      return [false, errors]
    }
  };
}

module.exports = scripts