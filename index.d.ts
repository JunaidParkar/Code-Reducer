/**
    * The base Module for codeReducer library.
    * This library can create wonderful stuffs and can reduce your code length.
    * It can create custom cursor with magnetic effect as you want (Customizable).
    * For source code visit https://github.com/JunaidParkar/codeReducer
*/
declare class codeReducer {
    scr?: any; // add type annotation for property
    constructor(); // add type annotation for constructor
    /**
        * Sets up the custom cursor with magnetic effect
        * @param {String} [crsrColor] - The color of the cursor
        * @param {Object} [magneticEffect] - The options for the magnetic effect
        * @param {Boolean} [magneticEffect.setMagnet] - Define whether to set magnetic effect or not
        * @param {Array} [magneticEffect.elementId] - The id's of the elements that will have the magnetic effect
        * @param {Number} [magneticEffect.treble] - The intensity of the magnetic effect between 0.1 to 1 only.
        * @param {Number} [magneticEffect.magneticHoverSize] - The size of the hover area for the magnetic effect
    */
    getCursor(
        crsrColor?: String,
        magneticEffect?: {
            setMagnet?: Boolean;
            elementId?: String[];
            treble?: Number;
            magneticHoverSize?: Number;
        }
    ): void
    /**
     * Create a captcha to verify human.
     * Captcha expires within 2 minutes after generated
     * @param {CallableFunction} [captcha] - Returns a callback with 3 parameters namely sequence, data, token
     */
    getCaptcha(captcha: CallableFunction): void
    /**
     * Verify the captcha
     * @param {String} [sequence] - provide the sequence given by getCaptcha()
     * @param {String} [captcha] - provide the captcha given by getCaptch()
     * @param {String} [token] - provide the given by getCaptch()
     * @param {String} [input] - provide the input captcha written by user
     * @param {CallableFunction} [result] - gives the result of captcha
     */
    verifyToken(sequence: String, captcha: String, token: String, input: String, result: CallableFunction): void
}

export = codeReducer