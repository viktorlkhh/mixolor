<a href="#quick-start">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/preview.png"
    width="220" align="right" alt="Try it!" />
</a>

# Mixolor

Mixolor is a lightweight, dependency-free color manipulation library for JavaScript.
You can parse colors, convert between formats, generate palettes, blend colors and much more.

It is great for design tools, data visualization, theming systems, accessibility checkers and terminal styling.
You can also use it when building color pickers, image processors or any project that works with colors.

Mixolor is available as an ES module and works in Node.js and modern browsers.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)
![Dependencies](https://img.shields.io/badge/dependencies-0-orange)

## Features

- parse colors from HEX, RGB, HSL, HSV and 140+ CSS named colors
- convert between color spaces (RGB, HSL, HSV, LAB, HEX)
- manipulate colors: lighten, darken, saturate, desaturate, rotate, invert
- blend modes: multiply, screen, overlay, soft-light, hard-light, difference
- apply filters: sepia, vintage, warm, cool
- generate harmonious palettes: complementary, triadic, analogous, tetradic
- Material Design color palettes out of the box
- simulate color blindness: protanopia, deuteranopia, tritanopia
- calculate contrast ratio (WCAG) and color distance (Delta E)
- create multi-stop gradients with CSS export
- convert from color temperature (Kelvin) and light wavelength (nm)
- terminal styling with ANSI colors, bold, italic, underline, gradients
- find closest CSS color name for any color
- zero dependencies, pure JavaScript

## Installation

```bash
npm install mixolor
```

Or clone from source:

```bash
git clone https://github.com/viktorlkhh/mixolor.git
cd mixolor
npm install
```

## Usage

Write your color code in a file `main.js`:

```javascript
import { color, Gradient, Palette } from 'mixolor'

var cyan = color('#54daf4')
console.log(cyan.toRGB())
console.log(cyan.lighten(20).toHex())
console.log(cyan.name())

var palette = Palette.from(cyan, 'triadic')
console.log(palette.toHex())

var gradient = Gradient.sunset()
console.log(gradient.toCSS('right'))
```

Launch it with:

```bash
node main.js
```

Run the demo to see all features:

```bash
node demo.js
```

## Documentation

### Color Creation

```javascript
Color.fromHex('#54daf4')
Color.fromRGB(84, 218, 244)
Color.fromHSL(190, 88, 64)
Color.fromHSV(190, 66, 96)
Color.fromKelvin(6500)
Color.fromWavelength(550)
Color.random()
Color.randomPastel()
Color.randomVibrant()

color('#54daf4')
color('rgb(84, 218, 244)')
color('hsl(190, 88%, 64%)')
color('coral')
color([84, 218, 244])
```

### Conversion

```javascript
c.toHex()       // '#54daf4'
c.toRGB()       // 'rgb(84, 218, 244)'
c.toHSL()       // { h: 190, s: 88, l: 64 }
c.toHSV()       // { h: 190, s: 66, v: 96 }
c.toLAB()       // { l: 82, a: -23, b: -18 }
c.toArray()     // [84, 218, 244, 1]
c.name()        // 'turquoise'
```

### Manipulation

```javascript
c.lighten(20)           c.darken(20)
c.saturate(20)          c.desaturate(20)
c.rotate(180)           c.complement()
c.invert()              c.grayscale()
c.alpha(0.5)            c.mix(other, 0.5)
c.blend(other, 'screen')
```

### Filters

```javascript
c.sepia(100)    c.vintage()
c.warm(40)      c.cool(40)
```

### Analysis

```javascript
c.luminance()           // 0.0 - 1.0
c.brightness()          // 0 - 255
c.isDark()              // true/false
c.isLight()             // true/false
c.contrast(other)       // WCAG ratio
c.distance(other)       // Delta E
c.isSimilar(other, 10)  // true/false
```

### Gradients

```javascript
Gradient.create('#54daf4', '#9b59b6')
Gradient.multi('#ff0000', '#00ff00', '#0000ff')
Gradient.rainbow()
Gradient.sunset()
Gradient.ocean()
Gradient.fire()
Gradient.neon()

g.at(0.5)                   // color at position
g.colors(5)                 // array of 5 colors
g.toCSS('right')            // linear-gradient(to right, ...)
g.toCSS(45)                 // linear-gradient(45deg, ...)
g.toRadialCSS('circle')     // radial-gradient(circle, ...)
g.reverse()
```

### Palettes

```javascript
Palette.from(color, 'complementary')
Palette.from(color, 'triadic')
Palette.from(color, 'analogous')
Palette.from(color, 'tetradic')
Palette.from(color, 'monochromatic')
Palette.material('blue')
Palette.material('red')
Palette.random(5)

p.toHex()       // ['#54daf4', '#f46d52', ...]
p.lighten(10)
p.darken(10)
p.reverse()
p.shuffle()
p.sortByHue()
p.sortByLuminance()
```

### Color Blindness

```javascript
import { simulate, isDistinguishable } from 'mixolor'

simulate(color, 'protanopia')
simulate(color, 'deuteranopia')
simulate(color, 'tritanopia')
simulate(color, 'achromatopsia')

isDistinguishable(color1, color2, 'deuteranopia')
```

### Terminal Styling

```javascript
import { style, fg, bg, styled, colorize, rainbow, textGradient } from 'mixolor'

styled('bold', style.bold)
styled('italic', style.italic)
styled('underline', style.underline)
styled('strikethrough', style.strikethrough)

colorize('text', 'coral')
colorize('text', 'coral', 'black')

rainbow('Rainbow text!')
textGradient('Gradient', '#54daf4', '#9b59b6')
```

## Why?

I needed a color library that:

- has zero dependencies
- works in both Node.js and browsers
- provides human-readable code without complex abstractions
- includes terminal styling for CLI tools
- supports color blindness simulation for accessibility testing

Existing libraries like chroma.js and color are great but include features I didn't need.
Mixolor focuses on the most common use cases with a simple, consistent API.

## Architecture

Mixolor is a JavaScript library with a **simplicity-first philosophy**.

- **Zero dependencies**: Pure JavaScript, no external packages
- **ES Modules**: Modern import/export syntax
- **Immutable operations**: All manipulation methods return new Color instances
- **Modular structure**: Core classes (Color, Gradient, Palette) with utility functions
- **Math-based**: Color science formulas for accurate conversions (sRGB, LAB, Delta E)

```
src/
  core/
    color.js      - Color class, conversions, manipulations
    gradient.js   - Gradient class, interpolation, CSS export
    palette.js    - Palette class, harmonies, sorting
    blindness.js  - Color blindness simulation
  utils/
    clamp.js      - Math utilities
    parse.js      - HEX parsing
    terminal.js   - ANSI escape codes
  data/
    named-colors.js - 140+ CSS color names
  index.js        - Public exports
```

## License

MIT
