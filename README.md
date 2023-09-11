# Code Reducer

![GitHub stars](https://img.shields.io/github/stars/JunaidParkar/codeReducer?style=social)
![GitHub forks](https://img.shields.io/github/forks/JunaidParkar/codeReducer?style=social)

The base module for the `codeReducer` library.

## Overview

`codeReducer` is a versatile JavaScript library designed to simplify and enhance your web development projects. This library offers a range of features to streamline your code and create engaging user experiences.

### Key Features

- **Custom Cursors**: Create custom cursors with magnetic effects, making your web applications visually engaging and interactive.

- **Captcha Generation**: Generate captchas to verify human users and enhance security in your applications. Captchas expire within 2 minutes after generation.

## Installation

You can install `codeReducer` via npm:

```bash
npm install codereducer
```

## Usage

Here's how you can use the `codeReducer` library in your JavaScript/TypeScript projects:

Create `Custom Cursor`

```javascript
import codereducer from "codereducer";

const cr = new codeReducer();

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

Generate and verify `captcha`

```javascript
import captcha from "codereducer/captcha";

const generateCaptcha = () => {
  let capt = new captcha();
  capt.createCaptha("captchaContainer", (token, status) => {
    if (status) {
      // Store the token somewhere
    }
  });
};

const verifyCaptcha = (input) => {
  let cr = new captcha();
  cr.verifyCaptcha(userCaptcha, tk, (status, message) => {
    console.log(status);
    console.log(message);
  });
};
```

## Documentation

For detailed usage instructions and additional features, please refer to the [documentation](https://github.com/JunaidParkar/codeReducer).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
