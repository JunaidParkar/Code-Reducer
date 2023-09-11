/**
    * The base Module for codeReducer library.
    * This library can create wonderful stuffs and can reduce your code length.
    * It can create custom cursor with magnetic effect as you want (Customizable).
    * For source code visit https://github.com/JunaidParkar/codeReducer
    * @method [getCursor] - Creates a custom cursor and allows to get magnetic effect.
*/
declare class codeReducer {
    // scr?: any; // add type annotation for property
    // constructor(); // add type annotation for constructor
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
}

export = codeReducer