import { Color, color } from '../src/index.js'
import { fg, bg, style } from '../src/index.js'

var reset = style.reset
var dim = style.dim
var bold = style.bold

function show(label, c) {
    console.log('  ' + bg(c) + '  ' + reset + '  ' + label.padEnd(16) + fg(c) + c.toHex() + reset)
}

console.log()
console.log(bold + '  Basic Usage' + reset)
console.log()

var cyan = color('#54daf4')
console.log(dim + '  Creating colors' + reset)
console.log()
show('From HEX', cyan)
show('From named', color('coral'))
show('From RGB string', color('rgb(255, 100, 50)'))
show('From array', color([100, 200, 150]))

console.log()
console.log(dim + '  Conversions' + reset)
console.log()
console.log('  ' + bg(cyan) + '  ' + reset + '  HEX:  ' + fg(cyan) + cyan.toHex() + reset)
console.log('  ' + bg(cyan) + '  ' + reset + '  RGB:  ' + fg(cyan) + cyan.toRGB() + reset)
console.log('  ' + bg(cyan) + '  ' + reset + '  HSL:  ' + fg(cyan) + JSON.stringify(cyan.toHSL()) + reset)
console.log('  ' + bg(cyan) + '  ' + reset + '  Name: ' + fg(cyan) + cyan.name() + reset)

console.log()
console.log(dim + '  Modifications' + reset)
console.log()
show('Original', cyan)
show('Lighter (+20)', cyan.lighten(20))
show('Darker (-20)', cyan.darken(20))
show('Inverted', cyan.invert())
show('Complement', cyan.complement())
show('Grayscale', cyan.grayscale())

console.log()
console.log(dim + '  Mixing colors' + reset)
console.log()
var coral = color('coral')
show('Cyan', cyan)
show('Coral', coral)
show('Mixed 50%', cyan.mix(coral, 0.5))

console.log()
console.log(dim + '  Analysis' + reset)
console.log()
var black = color('#000')
console.log('  Is dark: ' + cyan.isDark())
console.log('  Is light: ' + cyan.isLight())
console.log('  Brightness: ' + Math.round(cyan.brightness()))
console.log('  Contrast with black: ' + cyan.contrast(black).toFixed(2) + ':1')
console.log()
