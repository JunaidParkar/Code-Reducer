// /**
//  * Generate custom cursor
//  * @method getCursor - Creates custom cursor and hide default cursor.
// */

// declare class customCursor {
//     /**
//         * Sets up the custom cursor with magnetic effect
//         * @param {String} [crsrColor] - The color of the cursor
//         * @param {Object} [magneticEffect] - The options for the magnetic effect
//         * @param {Boolean} [magneticEffect.setMagnet] - Define whether to set magnetic effect or not
//         * @param {Array} [magneticEffect.elementId] - The id's of the elements that will have the magnetic effect
//         * @param {Number} [magneticEffect.treble] - The intensity of the magnetic effect between 0.1 to 1 only.
//         * @param {Number} [magneticEffect.magneticHoverSize] - The size of the hover area for the magnetic effect
//     */
//     getCursor(
//         crsrColor?: String,
//         magneticEffect?: {
//             setMagnet?: Boolean;
//             elementId?: String[];
//             treble?: Number;
//             magneticHoverSize?: Number;
//         }
//     ): void
// }

// export = customCursor

declare class customCursor {
    constructor(cursor: string, custom?: boolean)
    addMagnet(reference: string): void
    getCursor(): void
    makeMagnet(): void
    revert(): void
}

export = customCursor