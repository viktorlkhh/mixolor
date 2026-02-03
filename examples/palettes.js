import { Palette, color } from '../src/index.js'
import { bg, fg, style } from '../src/index.js'

var reset = style.reset
var dim = style.dim
var bold = style.bold

function showPalette(name, pal) {
    var bar = ''
    for (var i = 0; i < pal.colors.length; i++) {
        bar += bg(pal.colors[i]) + '   '
    }
    console.log('  ' + bar + reset + '  ' + name)
}

console.log()
console.log(bold + '  Palettes' + reset)
console.log()

var main = color('#54daf4')
console.log(dim + '  Color harmonies from ' + fg(main) + main.toHex() + reset)
console.log()

showPalette('complementary', Palette.from(main, 'complementary'))
showPalette('triadic', Palette.from(main, 'triadic'))
showPalette('analogous', Palette.from(main, 'analogous'))
showPalette('tetradic', Palette.from(main, 'tetradic'))
showPalette('monochromatic', Palette.from(main, 'monochromatic'))
showPalette('shades', Palette.from(main, 'shades'))
showPalette('tints', Palette.from(main, 'tints'))

console.log()
console.log(dim + '  Material Design' + reset)
console.log()

var materials = ['red', 'pink', 'purple', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange']
for (var j = 0; j < materials.length; j++) {
    var name = materials[j]
    var pal = Palette.material(name)
    var bar = ''
    var colors = pal.colors.slice(2, 8)
    for (var k = 0; k < colors.length; k++) {
        bar += bg(colors[k]) + '  '
    }
    console.log('  ' + bar + reset + '  ' + name)
}

console.log()
console.log(dim + '  Random palettes' + reset)
console.log()

for (var r = 0; r < 3; r++) {
    showPalette('random ' + (r + 1), Palette.random(5))
}

console.log()
console.log(dim + '  Palette operations' + reset)
console.log()

var triadic = Palette.from(main, 'triadic')
showPalette('Original', triadic)
showPalette('Lightened', triadic.lighten(20))
showPalette('Darkened', triadic.darken(20))
showPalette('Reversed', triadic.reverse())
showPalette('Sorted by hue', triadic.sortByHue())
showPalette('Sorted by lum', triadic.sortByLuminance())
console.log()
