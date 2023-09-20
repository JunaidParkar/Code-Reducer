# Code Reducer

![GitHub stars](https://img.shields.io/github/stars/JunaidParkar/codeReducer?style=social)
![GitHub forks](https://img.shields.io/github/forks/JunaidParkar/codeReducer?style=social)

The base module for the `codeReducer` library.

## Overview

`Code Reducer` is a versatile JavaScript library designed to simplify and enhance your web development projects. This library offers a range of features to streamline your code and create engaging user experiences.

### Key Features

- **Custom Cursors**: Create custom cursors with magnetic effects, making your web applications visually engaging and interactive.

- **Captcha Generation**: Generate captchas to verify human users and enhance security in your applications. Captchas expire within 2 minutes after generation.

- **Canvas video animation**: Create video like animation using frames on videos based on scrolling.

## Installation

You can install `codeReducer` via npm:

```bash
npm install codereducer
```

## Usage

Here's how you can use the `codeReducer` library in your JavaScript/TypeScript projects:

### Create `Custom Cursor`

```javascript
import customCursor from "codereducer/cursor";

const cr = new customCursor();

cr.getCursor({
  crsrColor: "red",
  magneticEffect: {
    setMagnet: true,
    elementId: ["element1", "element2"],
    treble: 0.5,
    magneticHoverSize: 10,
  },
});
```

## Generate and verify `captcha`

### In `React/Next JS`

```javascript
import React, { useRef, useState } from 'react'
import captcha from "codereducer/captcha";

const Page = () => {
  const reference = useRef(null)
  const [userInput, setUserInput] = useState()

  const generateCaptcha = () => {
    let capt = new captcha(reference, "#28282B");
    capt.createCaptha(, (token, status) => {
      if (status) {
        // Store the token somewhere
      }
    });
  };

  const verifyCaptcha = () => {
    let cr = new captcha();
    let tk = //token provided during creation on captcha
      cr.verifyCaptcha(userInput, tk, (status, message) => {
        if (status) {
          // Captcha verified successful
        } else {
          // Captcha verification not succed
        }
      });
  };

  return(<canvas ref={reference}></canvas>)
}

export.default = Page
```

### In `Vue JS`

```javascript
<template>
  <div>
    <canvas ref="captchaCanvas"></canvas>
  </div>
</template>

<script>
import captcha from "codereducer/captcha";
export default {
  data() {
    return {
      captchaInstance: null,
      userInput: "",
      token: null,
    };
  },
  mounted() {
    this.captchaInstance = new captcha(this.$refs.captchaCanvas, "#28282B");
  },
  methods: {
    createCaptcha() {
      this.captchaInstance.createCaptha((token, success) => {
        if (success) {
          // store the token somewhere
        } else {
          // error while creating captcha
        }
      });
    },
    verifyCaptcha() {
      this.captchaInstance.verifyCaptcha(
        this.userInput,
        this.token,
        (success, message) => {
          if (success) {
            // captcha verification successful
          } else {
            // failed in captcha verification
          }
        }
      );
    },
  },
  beforeDestroy() {
    this.captchaInstance.revert();
    this.captchaInstance = null;
  },
};
</script>
```

## Generate an Array of Images for Animation in Canvas Parallax

1. **Extract Frames from Video:**

   - Visit [Aspose Video to Image](https://products.aspose.app/video/video-to-image) and extract frames from your video. Choose a high frame count option based on your preference.

2. **Download and Extract Frames:**

   - Download the frames as a zip file and extract the contents.

3. **Setup Node.js Project:**

   - Create a new Node.js project or use an existing one.

4. **Install Code Reducer:**

   - Install `Code Reducer` using the following command:
     ```bash
     npm install codereducer
     ```

5. **Node.js Script to Generate Image Array:**

   - Create a new file in your project and add the following Node.js script:

     ```javascript
     const { handleImage } = require("codereducer/handleImages");

     handleImage(pathToFrames, outputPath);
     ```

     Replace `pathToFrames` with the full path to the directory containing your extracted frames and `outputPath` with the desired output directory for the array of image names.

6. **Run the Node.js Script:**

   - Run the Node.js script to generate a file named `listImages101.js` containing an array with image names in series.

7. **Organize Images in Your Project:**

   - Copy all the extracted images to your project's public directory. Create a folder (e.g., "xyz") and place the images inside this folder.

8. **Start Your Project Server:**

   - Start your project server.

9. **Access Images in Your Browser:**

   - Navigate to `http://yourprojecturl/xyz/imageName.jpg` to confirm that the images render correctly.

10. **Create an `images.js` File:**

    - In your project's `components` folder, create a file named `images.js`.

11. **Update `images.js` with Image Array:**

    - Update `images.js` with the image array obtained in step 6, adding the prefix `/xyz/` to each image path.

12. **Example `images.js`:**

    ```javascript
    export default [
      "/xyz/image1.jpg",
      "/xyz/image2.jpg",
      ...
    ];
    ```

13. **Implementation Ready:**
    - Your project is now set up and ready to use for creating a parallax animation using the generated image array.

## Animate `canvas parallex`

#### Use [aspose](https://products.aspose.app/video/video-to-image) for getting frames out of video.

#### Before starting this follow all the steps described above for getting array of all the images with assigning proper paths.

### In `React\Next JS`

```javascript
"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Josefin_Sans } from "next/font/google";
import images from "@/components/images"; // This images is an array containing absolute path of all images with respect to base URL
import canvasLoader from "codereducer/canvas";

const Home = () => {
  const cv = useRef(null);

  useLayoutEffect(() => {
    let canvas = new canvasLoader(cv.current, images, 200); // 200 is percentage of page till where animation should work change as per your convenience
    canvas.init();
    return () => {
      canvas.revert();
    };
  }, [cv]);

  return (
    <>
      <canvas ref={cv}></canvas>
    </>
  );
};

export default Home;
```

### In `Vue JS`

```javascript
<template>
  <div style={{height: ypx, width: xpx}}> // Important to give width and height to parent of canvas
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import CanvasLoader from './canvasLoader';

export default {
  data() {
    return {
      loader: null,
    };
  },
  mounted() {
    const canvasElement = this.$refs.canvas;
    const frames = [...]; // your frames extracted from video
    const percentToScroll = 300; // your percentToScroll change as per your convenience
    this.loader = new CanvasLoader(canvasElement, frames, percentToScroll);
    this.loader.init();
  },
  beforeDestroy() {
    if (this.loader) {
      this.loader.revert();
    }
  },
};
</script>
```
