/**
 * DO NOT USE WHILE HOSTING AS CLIENT SIDE RENDERING.
 * USE ONLY WILE DEVELOPMENT AND WILL WORK ONLY WITH SERVER SIDE RENDERING.
 * IF YOU DONOT HAVE SERVER SIDE OPTION THEN SIMPLY INITIALIZE AN EMPTY NODE PROJECT VIA [npm init] INSTALL CODEREDUCER AND IMPLIMENT IN THERE>
 * IT WILL CREATE A FILE CONTAINING ALL IMAGES LIST AS MENTIONED BY YOU.
 */

declare class handleImage {
  /**
   * Creates file containing names of all images in directory.
   * Kindly after getting the list remember to add proper paths.
   * If you are using in any framework remember to create a folder inside public folder and paste all the images there.
   * @param {string} [imageFolder] - Full path of directory where all the Images are available
   * @param {string} [destFolder] - Full path of directory where you want to create file.
   */
  createImageList(imageFolder: string, destFolder: string): void;
}

export default handleImage;
