import { 
    Color, color, Gradient, Palette, simulate,
    style, fg, bg, styled, colorize, rainbow, textGradient
} from './src/index.js'

let { bold, dim, underline, strikethrough, italic, reset } = style

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

let main = Color.fromHex('#54daf4')

section('Your color')
line(bg(main) + '    ' + reset + '  ' + fg(main) + bold + '#54daf4' + reset + dim + ' → ' + main.name() + reset)

section('Named colors')
let named = ['coral', 'steelblue', 'gold', 'tomato', 'orchid']
named.forEach(name => {
    let c = color(name)
    line(bg(c) + '  ' + reset + '  ' + name.padEnd(12) + fg(c) + c.toHex() + reset)
})

section('Modifications')
let mods = [
    ['original', main],
    ['lighten(20)', main.lighten(20)],
    ['darken(20)', main.darken(20)],
    ['saturate(30)', main.saturate(30)],
    ['desaturate(30)', main.desaturate(30)],
    ['complement', main.complement()],
    ['invert', main.invert()]
]
mods.forEach(([name, c]) => {
    line(bg(c) + '  ' + reset + '  ' + name.padEnd(16) + fg(c) + c.toHex() + reset)
})

section('Filters')
let filters = [
    ['original', main],
    ['sepia', main.sepia()],
    ['vintage', main.vintage()],
    ['warm', main.warm(50)],
    ['cool', main.cool(50)]
]
filters.forEach(([name, c]) => {
    line(bg(c) + '  ' + reset + '  ' + name.padEnd(12) + fg(c) + c.toHex() + reset)
})

section('Blend modes')
let blend = color('#ff6b6b')
let modes = ['multiply', 'screen', 'overlay', 'difference']
modes.forEach(mode => {
    let result = main.blend(blend, mode)
    line(bg(main) + '  ' + reset + ' + ' + bg(blend) + '  ' + reset + ' → ' + bg(result) + '  ' + reset + '  ' + mode)
})

section('Color blindness')
line(bg(main) + '  ' + reset + '  original')
let types = ['protanopia', 'deuteranopia', 'tritanopia']
types.forEach(type => {
    let sim = simulate(main, type)
    line(bg(sim) + '  ' + reset + '  ' + type)
})

section('Kelvin temperature')
let temps = []
for (let k = 1000; k <= 10000; k += 500) temps.push(Color.fromKelvin(k))
line(temps.map(c => bg(c) + ' ').join('') + reset)
line(dim + '1000K' + ' '.repeat(30) + '10000K' + reset)

section('Wavelength spectrum')
let spectrum = []
for (let nm = 380; nm <= 700; nm += 8) spectrum.push(Color.fromWavelength(nm))
line(spectrum.map(c => bg(c) + ' ').join('') + reset)
line(dim + '380nm' + ' '.repeat(32) + '700nm' + reset)

section('Gradient presets')
let presets = {
    rainbow: Gradient.rainbow(),
    sunset: Gradient.sunset(),
    ocean: Gradient.ocean(),
    fire: Gradient.fire(),
    neon: Gradient.neon()
}
Object.entries(presets).forEach(([name, g]) => {
    let bar = g.colors(25).map(c => bg(c) + ' ').join('') + reset
    line(bar + '  ' + name)
})

section('Color palettes')
let schemes = ['complementary', 'triadic', 'analogous', 'monochromatic']
schemes.forEach(scheme => {
    let pal = Palette.from(main, scheme)
    let bar = pal.colors.map(c => bg(c) + '   ').join('') + reset
    line(bar + '  ' + scheme)
})

section('Material Design')
let materials = ['blue', 'red', 'green', 'purple', 'orange']
materials.forEach(name => {
    let pal = Palette.material(name)
    let bar = pal.colors.slice(2, 8).map(c => bg(c) + '  ').join('') + reset
    line(bar + '  ' + name)
})

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
let white = color('#fff')
let black = color('#000')
let cWhite = main.contrast(white).toFixed(1)
let cBlack = main.contrast(black).toFixed(1)
line(bg(main) + fg(white) + ' Aa ' + reset + '  vs white: ' + cWhite + ':1')
line(bg(main) + fg(black) + ' Aa ' + reset + '  vs black: ' + cBlack + ':1')
line(dim + 'Best readable on ' + reset + bold + (parseFloat(cBlack) > parseFloat(cWhite) ? 'BLACK' : 'WHITE') + reset)

console.log()
console.log(dim + '  done.' + reset)
console.log()
