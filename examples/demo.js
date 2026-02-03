import { 
    Color, color, Gradient, Palette, simulate,
    style, fg, bg, styled, colorize, rainbow, textGradient
} from '../src/index.js'

var bold = style.bold
var dim = style.dim
var underline = style.underline
var strikethrough = style.strikethrough
var italic = style.italic
var reset = style.reset

function section(title) {
    console.log()
    console.log(dim + '  ' + title + reset)
    console.log()
}

function line(content) {
    console.log('    ' + content)
}

console.log()
console.log(bold + '  MIXOLOR' + reset)
console.log(dim + '  Color manipulation library' + reset)

var main = Color.fromHex('#54daf4')

section('Your color')
line(bg(main) + '    ' + reset + '  ' + fg(main) + bold + '#54daf4' + reset + dim + ' → ' + main.name() + reset)

section('Named colors')
var named = ['coral', 'steelblue', 'gold', 'tomato', 'orchid']
for (var i = 0; i < named.length; i++) {
    var name = named[i]
    var c = color(name)
    line(bg(c) + '  ' + reset + '  ' + name.padEnd(12) + fg(c) + c.toHex() + reset)
}

section('Modifications')
var mods = [
    ['original', main],
    ['lighten(20)', main.lighten(20)],
    ['darken(20)', main.darken(20)],
    ['saturate(30)', main.saturate(30)],
    ['desaturate(30)', main.desaturate(30)],
    ['complement', main.complement()],
    ['invert', main.invert()]
]
for (var j = 0; j < mods.length; j++) {
    var mod = mods[j]
    line(bg(mod[1]) + '  ' + reset + '  ' + mod[0].padEnd(16) + fg(mod[1]) + mod[1].toHex() + reset)
}

section('Filters')
var filters = [
    ['original', main],
    ['sepia', main.sepia()],
    ['vintage', main.vintage()],
    ['warm', main.warm(50)],
    ['cool', main.cool(50)]
]
for (var k = 0; k < filters.length; k++) {
    var f = filters[k]
    line(bg(f[1]) + '  ' + reset + '  ' + f[0].padEnd(12) + fg(f[1]) + f[1].toHex() + reset)
}

section('Blend modes')
var blend = color('#ff6b6b')
var modes = ['multiply', 'screen', 'overlay', 'difference']
for (var m = 0; m < modes.length; m++) {
    var mode = modes[m]
    var result = main.blend(blend, mode)
    line(bg(main) + '  ' + reset + ' + ' + bg(blend) + '  ' + reset + ' → ' + bg(result) + '  ' + reset + '  ' + mode)
}

section('Color blindness')
line(bg(main) + '  ' + reset + '  original')
var blindTypes = ['protanopia', 'deuteranopia', 'tritanopia']
for (var n = 0; n < blindTypes.length; n++) {
    var type = blindTypes[n]
    var sim = simulate(main, type)
    line(bg(sim) + '  ' + reset + '  ' + type)
}

section('Kelvin temperature')
var temps = []
for (var kelvin = 1000; kelvin <= 10000; kelvin += 500) {
    temps.push(Color.fromKelvin(kelvin))
}
var tempBar = ''
for (var t = 0; t < temps.length; t++) {
    tempBar += bg(temps[t]) + ' '
}
line(tempBar + reset)
line(dim + '1000K' + ' '.repeat(30) + '10000K' + reset)

section('Wavelength spectrum')
var spectrum = []
for (var nm = 380; nm <= 700; nm += 8) {
    spectrum.push(Color.fromWavelength(nm))
}
var specBar = ''
for (var s = 0; s < spectrum.length; s++) {
    specBar += bg(spectrum[s]) + ' '
}
line(specBar + reset)
line(dim + '380nm' + ' '.repeat(32) + '700nm' + reset)

section('Gradient presets')
var presets = [
    ['rainbow', Gradient.rainbow()],
    ['sunset', Gradient.sunset()],
    ['ocean', Gradient.ocean()],
    ['fire', Gradient.fire()],
    ['neon', Gradient.neon()]
]
for (var p = 0; p < presets.length; p++) {
    var preset = presets[p]
    var gradColors = preset[1].colors(25)
    var bar = ''
    for (var gc = 0; gc < gradColors.length; gc++) {
        bar += bg(gradColors[gc]) + ' '
    }
    line(bar + reset + '  ' + preset[0])
}

section('Color palettes')
var schemes = ['complementary', 'triadic', 'analogous', 'monochromatic']
for (var sc = 0; sc < schemes.length; sc++) {
    var scheme = schemes[sc]
    var pal = Palette.from(main, scheme)
    var palBar = ''
    for (var pc = 0; pc < pal.colors.length; pc++) {
        palBar += bg(pal.colors[pc]) + '   '
    }
    line(palBar + reset + '  ' + scheme)
}

section('Material Design')
var materials = ['blue', 'red', 'green', 'purple', 'orange']
for (var mat = 0; mat < materials.length; mat++) {
    var matName = materials[mat]
    var matPal = Palette.material(matName)
    var matColors = matPal.colors.slice(2, 8)
    var matBar = ''
    for (var mc = 0; mc < matColors.length; mc++) {
        matBar += bg(matColors[mc]) + '  '
    }
    line(matBar + reset + '  ' + matName)
}

section('Terminal styling')
line(styled('bold text', bold))
line(styled('italic text', italic))
line(styled('underline text', underline))
line(styled('strikethrough', strikethrough))
line(colorize('colored text', 'coral'))
line(colorize(' inverted ', 'black', 'white'))

section('Text effects')
line(rainbow('Rainbow colored text!'))
line(textGradient('Smooth gradient text from cyan to purple', '#54daf4', '#9b59b6'))
line(textGradient('Fire gradient effect here', '#f12711', '#f5af19'))

section('Contrast analysis')
var white = color('#fff')
var black = color('#000')
var cWhite = main.contrast(white).toFixed(1)
var cBlack = main.contrast(black).toFixed(1)
line(bg(main) + fg(white) + ' Aa ' + reset + '  vs white: ' + cWhite + ':1')
line(bg(main) + fg(black) + ' Aa ' + reset + '  vs black: ' + cBlack + ':1')
var bestOn = parseFloat(cBlack) > parseFloat(cWhite) ? 'BLACK' : 'WHITE'
line(dim + 'Best readable on ' + reset + bold + bestOn + reset)

console.log()
console.log(dim + '  done.' + reset)
console.log()
