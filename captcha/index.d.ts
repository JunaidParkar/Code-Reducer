/**
 * Make instance in order to work with captchas.
 * @param {string} [canvasElement] - Pass the reference of canvas elemet.
 * @param {string} [color] - Text color for captcha
 * @param {string} [key] -Secret key for data encryption
 * @method createCaptcha - Creates the captcha and gives its token as a callback. Captcha is valid only till 2m.
 * @method revert - Clean up function
*/

declare class captcha {
    constructor(canvasElement: string, color: string, key: string)
    /**
     * Create the captcha.
     * @description - A captcha will be generated and appended into a wrapper and a token will be given as callback. Remember the continer innerHTML should be empty.
     * @param {CallableFunction} [captchaToken] - Get the captcha and store it somewhere.
     * @param {(token: string, status: string) => void} [captchaToken] - A callback function to receive the captcha token and status. If status is true then only token will be passed else instead of token it will return the error text.
    */
    createCaptha(containerId: String, captchaToken: (token: String, status: Boolean) => void): void
    /**
     * Verify the captcha in simple steps.
     * @param {String} [input] - Enter the captcha input.
     * @param {String} [token] - Enter the token which was given during the captcha generation .
     * @param {CallableFunction} [result] - A callback function Which gives you the result of captcha.
     * @param {(status: Boolean, message: String)} [result] - status shows whether captcha is valid or not and message will show that is the error with the captcha.
     */
    verifyCaptcha(input: String, token: String, result: (status: String, message: String) => void): void
    /**
     * Clean up function
     */
    revert(): void
}

export = captcha