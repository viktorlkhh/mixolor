import { Color, color as parseColor } from '../core/color.js'

export var style = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    italic: '\x1b[3m',
    underline: '\x1b[4m',
    blink: '\x1b[5m',
    inverse: '\x1b[7m',
    hidden: '\x1b[8m',
    strikethrough: '\x1b[9m'
}

export function fg(input) {
    var c = input instanceof Color ? input : parseColor(input)
    return '\x1b[38;2;' + c.r + ';' + c.g + ';' + c.b + 'm'
}

export function bg(input) {
    var c = input instanceof Color ? input : parseColor(input)
    return '\x1b[48;2;' + c.r + ';' + c.g + ';' + c.b + 'm'
}

export function styled(text) {
    var styles = Array.prototype.slice.call(arguments, 1)
    return styles.join('') + text + style.reset
}

export function colorize(text, fgColor, bgColor) {
    var result = fg(fgColor)
    if (bgColor) {
        result += bg(bgColor)
    }
    return result + text + style.reset
}

export function rainbow(text) {
    var colors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8000ff']
    var result = ''
    
    for (var i = 0; i < text.length; i++) {
        var colorIndex = i % colors.length
        result += fg(colors[colorIndex]) + text.charAt(i)
    }
    
    return result + style.reset
}

export function gradient(text, color1, color2) {
    var c1 = color1 instanceof Color ? color1 : parseColor(color1)
    var c2 = color2 instanceof Color ? color2 : parseColor(color2)
    var result = ''
    var len = text.length

    for (var i = 0; i < len; i++) {
        var t = len > 1 ? i / (len - 1) : 0
        var mixed = c1.mix(c2, t)
        result += fg(mixed) + text.charAt(i)
    }

    return result + style.reset
}

export function box(text, borderColor) {
    var lines = text.split('\n')
    var maxWidth = 0
    
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > maxWidth) {
            maxWidth = lines[i].length
        }
    }

    var horizontalLine = ''
    for (var j = 0; j < maxWidth + 2; j++) {
        horizontalLine += '─'
    }

    var top = '┌' + horizontalLine + '┐'
    var bottom = '└' + horizontalLine + '┘'
    
    var middle = ''
    for (var k = 0; k < lines.length; k++) {
        var line = lines[k]
        var padding = ''
        for (var p = 0; p < maxWidth - line.length; p++) {
            padding += ' '
        }
        middle += '│ ' + line + padding + ' │'
        if (k < lines.length - 1) {
            middle += '\n'
        }
    }

    var boxText = top + '\n' + middle + '\n' + bottom
    
    if (borderColor) {
        return colorize(boxText, borderColor)
    }
    
    return boxText
}
