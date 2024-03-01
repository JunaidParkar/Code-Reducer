/**
 * NOT FOR YOUR USE. KINDLY DONT'T USE THIS CLASS
 */

class scripts {
  generateToken(length) {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randomIndex);
    }
    let token = password.split(".").join();
    return token;
  }
  async createToken(dataInJson, key) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(dataInJson));

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(key),
      { name: "AES-CBC" },
      false,
      ["encrypt"]
    );

    const encryptedData = await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv: new Uint8Array(16) },
      cryptoKey,
      encodedData
    );

    const base64EncryptedData = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
    const token = `${base64EncryptedData}&&tkn${Date.now() + 120000}`;

    return token;
  }

  async verifyToken(token, key) {
    try {
      const [base64EncryptedData, expirationTimeStr] = token.split("&&tkn");
      const expirationTime = Number(expirationTimeStr);

      // Check if the token is expired.
      if (Date.now() > expirationTime) {
        return [false, "Token expired"];
      }

      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(key),
        { name: "AES-CBC" },
        false,
        ["decrypt"]
      );

      const encryptedData = new Uint8Array(atob(base64EncryptedData).split('').map(char => char.charCodeAt(0)));
      const decryptedData = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: new Uint8Array(16) },
        cryptoKey,
        encryptedData
      );

      const decodedData = new TextDecoder().decode(decryptedData);
      const data = JSON.parse(decodedData);

      return [true, data];
    } catch (errors) {
      return [false, errors];
    }
  }
}




class captcha {
  constructor(canvasElement = null, color = null, key = null) {
    this.secret = key;
    this.canvas = canvasElement;
    this.scripts = new scripts();
    this.ctx = this.canvas.getContext("2d");
    this.color = color;
  }
  createCaptha(captchaToken) {
    let puzzle = this.scripts.generateToken(6);
    this.ctx.font = "30px Arial";
    let padding = 20;
    this.canvas.width = this.ctx.measureText(puzzle).width + padding * 2;
    this.canvas.height = parseInt(this.ctx.font, 10) + padding * 2;
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = this.color;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.canvas.style.margin = 0;
    this.ctx.fillText(puzzle, this.canvas.width / 2, this.canvas.height / 2);
    this.scripts
      .createToken({ captcha: puzzle }, this.secret)
      .then((tk) => {
        captchaToken(tk, true);
      })
      .catch((er) => {
        captchaToken(er, false);
      });
  }
  verifyCaptcha(input, token, result) {
    this.scripts.verifyToken(token, this.secret)
      .then((t) => {
        let [status, message] = t;
        if (status) {
          let data = message.captcha;
          if (data == input) {
            result(true, "Success");
          } else {
            result(false, "Wrong captcha");
          }
        } else {
          result(false, message);
        }
      })
      .catch((error) => {
        console.error("Error verifying captcha:", error);
        result(false, "Error verifying captcha");
      });
  }
  
  revert() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default captcha;