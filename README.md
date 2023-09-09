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

```javascript
const codeReducer = require("code-reducer");

const cr = new codeReducer();

// Create a custom cursor with magnetic effect
cr.getCursor({
  crsrColor: "red",
  magneticEffect: {
    setMagnet: true,
    elementId: ["element1", "element2"],
    treble: 0.5,
    magneticHoverSize: 10,
  },
});

// Generate a captcha for human verification
cr.getCaptcha((sequence, data, token) => {
  // Handle captcha data here
});

// Verify the captcha
cr.verifyToken(sequence, captcha, token, input, (result) => {
  // Handle the captcha verification result
});
```

## Documentation

For detailed usage instructions and additional features, please refer to the [documentation](https://github.com/JunaidParkar/codeReducer).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
