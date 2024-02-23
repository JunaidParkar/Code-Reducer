import fs from "fs";

class handleImage {
  async createImageList(imageFolder, destFolder) {
    try {
      const images = await fs.promises.readdir(imageFolder);
      images.sort();
      const imageList = [];
      for (const image of images) {
        imageList.push(image);
      }
      await fs.promises.writeFile(
        `${destFolder}\\listsImages101.js`,
        `const imageList = ${JSON.stringify(imageList)};`
      );
    } catch {}
  }
}

export default handleImage;
