import { Gradient } from '../src/index.js'
import { bg, style } from '../src/index.js'

var reset = style.reset
var dim = style.dim
var bold = style.bold

function showGradient(name, g, count) {
    var colors = g.colors(count || 30)
    var bar = ''
    for (var i = 0; i < colors.length; i++) {
        bar += bg(colors[i]) + ' '
    }
    console.log('  ' + bar + reset + '  ' + name)
}

console.log()
console.log(bold + '  Gradients' + reset)
console.log()

console.log(dim + '  Custom gradients' + reset)
console.log()

var simple = Gradient.create('#54daf4', '#9b59b6')
showGradient('Two colors', simple)

var multi = Gradient.multi('#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff')
showGradient('Multi-stop', multi)

console.log()
console.log(dim + '  Preset gradients' + reset)
console.log()

showGradient('rainbow', Gradient.rainbow())
showGradient('sunset', Gradient.sunset())
showGradient('ocean', Gradient.ocean())
showGradient('forest', Gradient.forest())
showGradient('fire', Gradient.fire())
showGradient('purple', Gradient.purple())
showGradient('peach', Gradient.peach())
showGradient('midnight', Gradient.midnight())
showGradient('sky', Gradient.sky())
showGradient('neon', Gradient.neon())

console.log()
console.log(dim + '  Gradient operations' + reset)
console.log()

var sunset = Gradient.sunset()
showGradient('Original', sunset)
showGradient('Reversed', sunset.reverse())
showGradient('Shifted +60', sunset.shift(60))
showGradient('Shifted +180', sunset.shift(180))

console.log()
console.log(dim + '  Color at position' + reset)
console.log()

var ocean = Gradient.ocean()
var positions = [0, 0.25, 0.5, 0.75, 1]
for (var j = 0; j < positions.length; j++) {
    var pos = positions[j]
    var c = ocean.at(pos)
    console.log('  ' + bg(c) + '    ' + reset + '  at(' + pos + ') = ' + c.toHex())
}

console.log()
console.log(dim + '  CSS export' + reset)
console.log()
console.log('  ' + simple.toCSS('right'))
console.log('  ' + simple.toCSS(45))
console.log('  ' + simple.toRadialCSS('circle'))
console.log()
