# chromo-mimic

![CI Build status](https://img.shields.io/github/workflow/status/matsdahlin/chromo-mimic/CI)
![NPM Version](https://img.shields.io/npm/v/chromo-mimic?color=lightblue)
![Minified Size](https://img.shields.io/bundlephobia/min/chromo-mimic)
![License](https://img.shields.io/npm/l/chromo-mimic)

> A small utility to extract colors from an image based on simple filter criterias.

## Why another color extractor?

I was playing around with a clone of Spotifys "now playing" UI on mobile a while back, and wanted to create it in vanilla **HTML/CSS/JS**.

None of the existing color extractor libraries could achieve the effect I wanted, so I created this package to scratch my own itch and learn about NPM at the same time 😄

## Features

- lightweight
- zero dependencies
- HSL-first
- granular filter control

## Installation

As ESM module:

```shell
npm install chromo-mimic
```

Use in your HTML from CDN:

```html
<script src="https://unpkg.com/chromo-mimic/dist/chromo-mimic.js"></script>
```

> Tip: add a version number to the url to always get a specific version: `https://unpkg.com/chromo-mimic@1.0.0/dist/chromo-mimic.js`

## Example using CDN

The `ChromoMimic` object will be globally availble:

```html
<script>
  ChromoMimic.getColorFromImage('./img/boy-with-apple.jpg');
</script>
```

## Example using React

```jsx
import React, { useEffect, useState } from 'react';
import ChromoMimic from 'chromo-mimic';

function App() {
  const [color, setColor] = useState({});

  useEffect(() => {
    ChromoMimic.getColorFromImage('src/cat.jpeg').then((extractedColor) => {
      setColor(extractedColor); // The extracted color as an HSL object {h, s, l}
    });
  }, []);

  return <pre>{JSON.stringify(color, null, 2)}</pre>;
}

export default App;
```

> ⚠️ chromo-mimic use the canvas API, so it is _not_ possible to directly load an image from another domain.
