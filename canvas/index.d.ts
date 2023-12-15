/**
 * Create vedio like effect based on scrolling.
 * import classLoader takes some arguments for initializing.
 * Remember to give width and height to the element in which you want canvas to be appended.
 * @param {string} [canvasElement] - Pass the reference of Canvas tag.
 * @param {string[]} [frames] - Pass the array containing images paths in proper sequence. Paths should be absolute to root directory.
 * @param {number} [percentToScroll] - Enter the percentage at which scroll should end. It should be greater than 100 and {%} sign not to be included.
 * @method init - Initialize and starts rendering canvas.
 * @method revert - Clean up all the animations
 */

declare class canvasLoader {
  constructor(canvasElement: string, frames: string[], percentToScroll: number);
  /**
   * Initialize your canvas element.
   */
  init(): void;
  /**
   * Cleanup the animation
   */
  revert(): void;
}

export default canvasLoader;
