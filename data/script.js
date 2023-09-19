const jwt = require("jsonwebtoken")

/**
 * NOT FOR YOUR USE. KINDLY DONT'T USE THIS CLASS
 */

class scripts {
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