# Code Reducer

![GitHub stars](https://img.shields.io/github/stars/JunaidParkar/codeReducer?style=social)
![GitHub forks](https://img.shields.io/github/forks/JunaidParkar/codeReducer?style=social)

The base module for the `codeReducer` library.

# Overview

`Code Reducer` is a versatile JavaScript library designed to simplify and enhance your web development projects. This library offers a range of features to streamline your code and create engaging user experiences.

# Key Features

- **Dkit**: With Dkit, manipulating the DOM becomes a breeze! Enjoy coding with Dkit.

- **Custom Cursors**: Create custom cursors with magnetic effects, making your web applications visually engaging and interactive.

- **Captcha Generation**: Generate captchas to verify human users and enhance security in your applications. Captchas expire within 2 minutes after generation.

- **Artex**: Create an Chat bit just by creating a normal dataset. Get a fully functional chatbot assistant for your projects within just few lines of code. This is just a miniature version of A.R.T.E.X AI (under development, not yet released)

# Installation

You can install `codeReducer` via npm:

```bash
npm install codereducer
```

Can use it with HTML by including our CDN. Every features has its own CDN to make your code light weight.Make sure to add all CDN in body tag before all the script tags.

# Usage

Here's how you can use the `codeReducer` library in your JavaScript projects:

## Manipulate `DOM` with `Dkit`

****In frameworks import using****

```javascript
import Dkit from "codereducer/dkit";
```

****To use dkit in HTML use this CDN.****

```HTML
<script src="https://junaidparkar.github.io/Code-Reducer-CDN/dist/dkit/index.js" ></script>
```

***To use dkit here are the methods***

**init()**

This method initialize Dkit (DOM kit) tools.

```javascript
let dkit = Dkit.init();
```

**id()**

This method can be used to select an element with the specified ID.

```javascript
dkit.id("myId");
```

**class()**

This method can be used to select an element with the specified class name.

```javascript
dkit.class("myClass");
```

**tag()**

This method can be used to select an element with the specified tag name.

```javascript
dkit.tag("myTag");
```

**query()**

This method can be used to select an element using a CSS selector.

```javascript
dkit.query(".myClass #myId");
```

**create()**

This method can be used to select a new HTML element with the specified tag.

```javascript
dkit.create("div");
```

**get()**

This method is mandatory as it returns the currently selected HTML element.

```javascript
let element = dkit.get();
```

**revert()**

This method can be used for cleanUp. It clears all the selected elements

****How to use in frameworks****

Here's an example of how you might use Dkit to create a new `div` element, add it to the DOM, and then manipulate it:

```javascript
import Dkit from "codereducer/dkit";
```

or

```HTML
<script src="https://junaidparkar.github.io/Code-Reducer-CDN/dist/dkit/index.js" ></script>
```

Now use like this

```javascript
// Create a new div element
let div = Dkit.init().create("div").get();

// Add the div to the body of the document
document.body.appendChild(div);
```

Now get an list of all `h3` tag from inside a `div` tag with id myDiv

```javascript
// target all h3 in div
let h3 = Dkit.init().id("myDiv").tag("h3").get();
```

use single call for multiple manipulations

```javascript
import Dkit from "codereducer/dkit";

// initialize dKit
let kit = Dkit.init();

// get first element
let elem = init.id("scroll1").tag("canvas").get();

// target second element
let h1 = init.id("try").tag("h1");

// get second element
let elem2 = h1.get();

// use all elements
console.log(elem1); // return all the element you targetted
console.log(elem2); // return all the element you targetted
console.log(h1); // consoles the array or a prototype

h1.revert(); // cleans up all the instances

console.log(h1); // console or return null
```

With Dkit, manipulating the DOM becomes a breeze! Enjoy coding with Dkit.

## Create `Custom Cursor`

1. First import `custom cursor` in framework via

```javascript
import CustomCursor from "codereducer/cursor"
```

or use this CDN

```HTML
<script src="https://junaidparkar.github.io/Code-Reducer-CDN/dist/cursor/index.js"></script>
```

2. To use it just use it like this

```javascript
let dom = Dkit.init()
dom.id("cursor-element") // an empty div element
let c = new CustomCursor(dom.get(), false)
c.getCursor()
dom.revert()
```

3. Only if using any framework you need to use an clean up function that will be 

```javascript
c.revert()
```

**Create a magnetic effect after adding custom cursor.**

`Note: Custom cursor is mandatory in order to make magnetic effect`

```javascript
let magneticElements = [document.getElementById("elem1"), document.getElementById("elem2")]

c.makeMagnet(magneticElements)
```

if using frame works then for sure you will use References. And this can be implemented by

```javascript
'use client'
import customCursor from 'codereducer/cursor'
import { useEffect, useRef } from 'react'

export default function Home() {

  const myRef = useRef();

  const setRef = (element) => {
    if (element) {
      myRef.current = [...(myRef.current || []), element];
    }
  };

  useEffect(() => {
    let c = new customCursor()
    c.getCursor()
    c.makeMagnet(myRef.current)
    return () => {
      c.revert()
    }
  }, []);

  return (
    <div ref={setRef}></div>
    <h1 ref={setRef}></h1>
    <a ref={setRef}></a>
  )
```

## Generate and verify `captcha`

1. First import using

```javascript
import captcha from "codereducer/captcha"
```

for CDN use

```HTML
<script src="https://junaidparkar.github.io/Code-Reducer-CDN/dist/captcha/index.js" ></script>
```

2. Initialize captcha

```javascript
let dom = Dkit.init()
dom.id("canvas-tag")
// let capt = new captcha(dom.get(), "any colour for captcha font", "any 128 bit key")
let capt = new captcha(dom.get(), "#f5f5f5", "6rRwhBidAD0dME9mSo8Rr88F9A8TLVcR")
dom.revert()
```

3. Generate captcha

```javascript
capt.createCaptha((token, status) => {
    if (status) {
        // store the token some where
    } else {
        reject("Error generating captcha");
    }
});
```

4. Verify captcha

```javascript
cr.verifyCaptcha("userInput", "token", (status, message) => {
    if (status) {
        // Captcha verified successfully
    } else {
        console.log("failed");
        // Captcha verification not successful
    }
});
```

## Implement A Chatbot

1. **Before implementing a chatbot first prepare the dataset for it.**
2. **Dataset must be in the following order. No errors are allowed in it.**

#### Here is the format of dataset:

```javascript
const intent = {
  hello: {
    patterns: ["hey jarvis", "hey buddy", "hello dear", "wake up"],
    responses: [
      "welcome back sir",
      "Nice to see you again",
      "How can I help you now?",
      "Just talking to myself?",
    ],
  },
  silent: {
    patterns: ["go to silent mode", "shut your mouth", "keep silent"],
    responses: ["okay, Got into silent mode sir", "silent mode turned on"],
  },
  bye: {
    patterns: [
      "Bye jarvis",
      "Nice to see you",
      "good to see you",
      "meet you soon",
      "having a sleep",
    ],
    responses: [
      "Hope to see you soon",
      "Have a good time sir",
      "It was nice talking to you sir",
    ],
  },
};
```

1. Here keys "hello", "silent", "bye" represent intents and patterns under that key represents list of words which can trigger that particular intent.
2. Patterns represent the array of all the questions that users can ask to chat bot
3. Responses represents array of responses to be given by chatbot when user asks any question from patterns.

### To implement it first import to your project by

1. **Import**

```javascript
import ChatBot from "codereducer/artex";
```

in HTML use this

```HTML
<script src="https://junaidparkar.github.io/Code-Reducer-CDN/dist/artex/index.js"></script>
```

2. **Initialize**

```javascript
let bot = new ChatBot(intent, 80);
```

Here first parameter intent is the dataset you created and second is the temperature i.e randomness that you can vary from 0 to 100.

3. **Get response**

```javascript
bot.chat("Hey there");
```


### Support us in our project with aim to help developers to write as minimal code as they can to reduce the development of every one.