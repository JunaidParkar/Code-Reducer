// const scripts = require("../data/script");

import scripts from "../data/script";

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
