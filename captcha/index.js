var scripts = require('../data/script')

class captcha {
    constructor() {
        this.scripts = new scripts()
    }
    createCaptha(containerId, captchaToken) {
        if (document.getElementById(containerId).innerHTML == '') {
            let captcha = this.scripts.generateString(6);
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            ctx.font = '30px Arial';
            let padding = 20;
            canvas.width = ctx.measureText(captcha).width + padding * 2;
            canvas.height = parseInt(ctx.font, 10) + padding * 2;
            ctx.font = '30px Arial';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            canvas.style.margin = 0
            ctx.fillText(captcha, canvas.width / 2, canvas.height / 2);
            document.getElementById(containerId).appendChild(canvas)
            let token = this.scripts.createToken({captcha: captcha})
            captchaToken(token, true);
        } else {
            console.warn(`Element ID ${containerId} innerHTML is not empty`)
            captchaToken(`Element ID ${containerId} innerHTML is not empty`, false)
        }
    }
    verifyCaptcha(input, token, result) {
        console.log(1, token)
        let t = this.scripts.verifyToken(token)
        let [status, message] = t
        if (status) {
            let data = message.captcha
            if (data == input) {
                result(true, "Success")
            } else {
                result(false, "Wrong captcha")
            }
        } else{
            result(false, message)
        }
    }
}

module.exports = captcha
