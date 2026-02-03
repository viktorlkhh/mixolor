import { Color } from './color.js'
import { clamp01 } from '../utils/clamp.js'

export class Gradient {
    constructor(stops) {
        this.stops = []
        var inputStops = stops || []
        
        for (var i = 0; i < inputStops.length; i++) {
            var s = inputStops[i]
            var col = s.color instanceof Color ? s.color : Color.fromHex(s.color)
            this.stops.push({ color: col, pos: s.pos })
        }
        
        this.stops.sort(function(a, b) {
            return a.pos - b.pos
        })
    }

    static create(c1, c2) {
        var color1 = typeof c1 === 'string' ? Color.fromHex(c1) : c1
        var color2 = typeof c2 === 'string' ? Color.fromHex(c2) : c2
        return new Gradient([
            { color: color1, pos: 0 },
            { color: color2, pos: 1 }
        ])
    }

    static multi() {
        var colors = Array.prototype.slice.call(arguments)
        var stops = []
        var count = colors.length
        
        for (var i = 0; i < count; i++) {
            var c = colors[i]
            var col = typeof c === 'string' ? Color.fromHex(c) : c
            var pos = count > 1 ? i / (count - 1) : 0
            stops.push({ color: col, pos: pos })
        }
        
        return new Gradient(stops)
    }

    static rainbow() {
        return Gradient.multi('#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#8000ff')
    }

    static sunset() {
        return Gradient.multi('#ff512f', '#dd2476')
    }

    static ocean() {
        return Gradient.multi('#2193b0', '#6dd5ed')
    }

    static forest() {
        return Gradient.multi('#11998e', '#38ef7d')
    }

    static fire() {
        return Gradient.multi('#f12711', '#f5af19')
    }

    static purple() {
        return Gradient.multi('#8e2de2', '#4a00e0')
    }

    static peach() {
        return Gradient.multi('#ed4264', '#ffedbc')
    }

    static midnight() {
        return Gradient.multi('#232526', '#414345')
    }

    static sky() {
        return Gradient.multi('#2980b9', '#6dd5fa', '#ffffff')
    }

    static neon() {
        return Gradient.multi('#00f260', '#0575e6')
    }

    addStop(c, pos) {
        var col = typeof c === 'string' ? Color.fromHex(c) : c
        this.stops.push({ color: col, pos: pos })
        this.stops.sort(function(a, b) {
            return a.pos - b.pos
        })
        return this
    }

    at(t) {
        t = clamp01(t)

        if (this.stops.length === 0) {
            return new Color()
        }
        
        if (this.stops.length === 1) {
            return this.stops[0].color.clone()
        }

        var first = this.stops[0]
        var last = this.stops[this.stops.length - 1]

        if (t <= first.pos) {
            return first.color.clone()
        }
        
        if (t >= last.pos) {
            return last.color.clone()
        }

        for (var i = 0; i < this.stops.length - 1; i++) {
            var s1 = this.stops[i]
            var s2 = this.stops[i + 1]

            if (t >= s1.pos && t <= s2.pos) {
                var localT = (t - s1.pos) / (s2.pos - s1.pos)
                return s1.color.mix(s2.color, localT)
            }
        }

        return first.color.clone()
    }

    colors(count) {
        var result = []
        for (var i = 0; i < count; i++) {
            var t = count === 1 ? 0 : i / (count - 1)
            result.push(this.at(t))
        }
        return result
    }

    toCSS(direction) {
        var dir = direction || 'right'
        var stopsArr = []
        
        for (var i = 0; i < this.stops.length; i++) {
            var s = this.stops[i]
            stopsArr.push(s.color.toHex() + ' ' + Math.round(s.pos * 100) + '%')
        }
        
        var stopsStr = stopsArr.join(', ')

        var dirMap = {
            'right': 'to right',
            'left': 'to left',
            'top': 'to top',
            'bottom': 'to bottom',
            'top-right': 'to top right',
            'top-left': 'to top left',
            'bottom-right': 'to bottom right',
            'bottom-left': 'to bottom left'
        }

        var cssDir = dirMap[dir]
        if (!cssDir) {
            cssDir = typeof dir === 'number' ? dir + 'deg' : dir
        }

        return 'linear-gradient(' + cssDir + ', ' + stopsStr + ')'
    }

    toRadialCSS(shape) {
        var s = shape || 'circle'
        var stopsArr = []
        
        for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i]
            stopsArr.push(stop.color.toHex() + ' ' + Math.round(stop.pos * 100) + '%')
        }
        
        return 'radial-gradient(' + s + ', ' + stopsArr.join(', ') + ')'
    }

    toConicCSS(angle) {
        var a = angle || 0
        var stopsArr = []
        
        for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i]
            stopsArr.push(stop.color.toHex() + ' ' + Math.round(stop.pos * 100) + '%')
        }
        
        return 'conic-gradient(from ' + a + 'deg, ' + stopsArr.join(', ') + ')'
    }

    reverse() {
        var newStops = []
        for (var i = 0; i < this.stops.length; i++) {
            var s = this.stops[i]
            newStops.push({ color: s.color.clone(), pos: 1 - s.pos })
        }
        return new Gradient(newStops)
    }

    shift(degrees) {
        var newStops = []
        for (var i = 0; i < this.stops.length; i++) {
            var s = this.stops[i]
            newStops.push({ color: s.color.rotate(degrees), pos: s.pos })
        }
        return new Gradient(newStops)
    }
}

export function gradient() {
    var args = Array.prototype.slice.call(arguments)
    
    if (args[0] instanceof Gradient) {
        return args[0]
    }
    
    if (args.length === 1 && Array.isArray(args[0])) {
        return Gradient.multi.apply(null, args[0])
    }
    
    if (args.length >= 2) {
        return Gradient.create(args[0], args[1])
    }
    
    return new Gradient()
}
