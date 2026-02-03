import { color, simulate, isDistinguishable } from '../src/index.js'
import { bg, fg, style } from '../src/index.js'

var reset = style.reset
var dim = style.dim
var bold = style.bold

console.log()
console.log(bold + '  Accessibility' + reset)
console.log()

var main = color('#54daf4')
var white = color('#ffffff')
var black = color('#000000')

console.log(dim + '  Contrast check for ' + fg(main) + main.toHex() + reset)
console.log()

var contrastWhite = main.contrast(white)
var contrastBlack = main.contrast(black)

console.log('  ' + bg(main) + fg(white) + ' Aa ' + reset + '  vs white: ' + contrastWhite.toFixed(2) + ':1')
console.log('  ' + bg(main) + fg(black) + ' Aa ' + reset + '  vs black: ' + contrastBlack.toFixed(2) + ':1')

console.log()
console.log(dim + '  WCAG compliance' + reset)
console.log()

var aaWhite = contrastWhite >= 4.5 ? 'PASS' : 'FAIL'
var aaBlack = contrastBlack >= 4.5 ? 'PASS' : 'FAIL'
var aaaWhite = contrastWhite >= 7 ? 'PASS' : 'FAIL'
var aaaBlack = contrastBlack >= 7 ? 'PASS' : 'FAIL'

console.log('  AA  (4.5:1) white: ' + aaWhite)
console.log('  AA  (4.5:1) black: ' + aaBlack)
console.log('  AAA (7.0:1) white: ' + aaaWhite)
console.log('  AAA (7.0:1) black: ' + aaaBlack)

var bestText = contrastBlack > contrastWhite ? 'black' : 'white'
console.log()
console.log('  Best text color: ' + bold + bestText.toUpperCase() + reset)

console.log()
console.log(dim + '  Color blindness simulation' + reset)
console.log()

console.log('  ' + bg(main) + '  ' + reset + '  original')

var types = ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia']
for (var i = 0; i < types.length; i++) {
    var type = types[i]
    var sim = simulate(main, type)
    console.log('  ' + bg(sim) + '  ' + reset + '  ' + type)
}

console.log()
console.log(dim + '  Distinguishability test' + reset)
console.log()

var red = color('#ff0000')
var green = color('#00ff00')

console.log('  ' + bg(red) + '  ' + reset + ' vs ' + bg(green) + '  ' + reset)
console.log()

var normalDist = isDistinguishable(red, green) ? 'YES' : 'NO'
var protanDist = isDistinguishable(red, green, 'protanopia') ? 'YES' : 'NO'
var deuterDist = isDistinguishable(red, green, 'deuteranopia') ? 'YES' : 'NO'

console.log('  Normal vision:   ' + normalDist)
console.log('  Protanopia:      ' + protanDist)
console.log('  Deuteranopia:    ' + deuterDist)

console.log()
console.log(dim + '  Color metrics' + reset)
console.log()

console.log('  Luminance:   ' + main.luminance().toFixed(4))
console.log('  Brightness:  ' + Math.round(main.brightness()))
console.log('  Is dark:     ' + main.isDark())
console.log('  Is light:    ' + main.isLight())

var coral = color('coral')
console.log()
console.log('  Distance ' + fg(main) + main.toHex() + reset + ' to ' + fg(coral) + coral.toHex() + reset + ': ' + main.distance(coral).toFixed(2))
console.log('  Similar (threshold 50): ' + main.isSimilar(coral, 50))
console.log()
