const randomWords = require("random-words")
const jwt = require("jsonwebtoken")

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
  
  verifyToken(token) {
    try {
      let tokenList = token.split(".");
      let tokenPart0 = tokenList[1];
      let tokenPart1 = tokenList[3];
      let tokenPart2 = tokenList[5];
      try {
        const decoded = jwt.verify(`${tokenPart0}.${tokenPart2}.${tokenPart1}`, "BJ537MumEoT1Da0iBgi5ZF0w8ZFGXxq8");
        return { stat: 200, message: decoded };
      } catch (err) {
        return { stat: 700, message: err };
      }
    } catch (errors) {
      return { stat: 700, message: errors };
    }
  };
  createCaptcha() {
    let words =  randomWords.generate({exactly: 100})
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const sentence = [];
    for (let i = 0; i < 5; i++) {
      const randomIndexWords = Math.floor(Math.random() * words.length);
      const randomIndexNumbers = Math.floor(Math.random() * numbers.length);
      const num = Math.floor(Math.random() * 10)
      if (num % 2 === 0) {
        sentence.push(words[randomIndexWords]);
      } else {
        sentence.push(numbers[numbers[randomIndexNumbers]]);
      }
    }
    return sentence
  }
  createSequence() {
    let a =[1,2,3]
    const numbers = new Set(); // Use a Set to store unique numbers
    while (numbers.size < 5) {
      const genNum = Math.floor(Math.random() * 4) + 1;
      numbers.add(genNum); // Add the number to the Set (automatically enforces uniqueness)
    }
    return Array.from(numbers); // Convert the Set back to an array
  }
}

module.exports = scripts