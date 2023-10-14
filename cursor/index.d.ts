/**
 * Generate custom cursor
 * @param {string} [cursor] - Reference of the element you want to make a cursor
 * @param {boolean} [custom] - True if you want to style the custom cursor by yourself else set to false for default custom cursor.
 * @method getCursor - Creates custom cursor and hide default cursor.
 * @method makeMagnet - Creates a magnetic effect on element
 * @method revert - A clean up function for all animations performed
*/

declare class customCursor {
    constructor(cursor: string, custom?: boolean)
    /**
     * Get the cursor 
     */
    getCursor(): void
    /**
     * Get the magnetic effect on the elements you want
     * @param {[]} [refArray] - Pass the array of all the references of elements you want to magnetise
     */
    makeMagnet(refArray: []): void
    /**
     * A clean up function used before unmounting
     */
    revert(): void
}

export = customCursor