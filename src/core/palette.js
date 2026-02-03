import { Color } from './color.js'

export class Palette {
    constructor(colors = []) {
        this.colors = colors.map(c => c instanceof Color ? c : Color.fromHex(c))
    }

    static from(base, scheme = 'complementary') {
        const color = typeof base === 'string' ? Color.fromHex(base) : base

        const schemes = {
            complementary: [color, color.complement()],
            
            analogous: [color.rotate(-30), color, color.rotate(30)],
            
            triadic: [color, color.rotate(120), color.rotate(240)],
            
            tetradic: [color, color.rotate(90), color.rotate(180), color.rotate(270)],
            
            'split-complementary': [color, color.rotate(150), color.rotate(210)],
            
            monochromatic: [
                color.darken(30), color.darken(15), color,
                color.lighten(15), color.lighten(30)
            ],
            
            shades: Array.from({ length: 5 }, (_, i) => color.darken(i * 12)),
            
            tints: Array.from({ length: 5 }, (_, i) => color.lighten(i * 12))
        }

        return new Palette(schemes[scheme] || [color])
    }

    static random(count = 5) {
        const base = Math.random() * 360
        const colors = Array.from({ length: count }, (_, i) => {
            const h = (base + i * (360 / count) + Math.random() * 15) % 360
            return Color.fromHSL(h, 60 + Math.random() * 30, 45 + Math.random() * 25)
        })
        return new Palette(colors)
    }

    static material(name) {
        const colors = {
            red: ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c'],
            pink: ['#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f'],
            purple: ['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c'],
            indigo: ['#e8eaf6', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e'],
            blue: ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1'],
            cyan: ['#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064'],
            teal: ['#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#004d40'],
            green: ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20'],
            orange: ['#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100'],
            grey: ['#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#9e9e9e', '#757575', '#616161', '#424242', '#212121']
        }
        return new Palette(colors[name] || colors.blue)
    }

    get length() {
        return this.colors.length
    }

    at(i) {
        if (i < 0) i = this.colors.length + i
        return this.colors[i]?.clone()
    }

    first() { return this.at(0) }
    last() { return this.at(-1) }

    add(color) {
        this.colors.push(typeof color === 'string' ? Color.fromHex(color) : color)
        return this
    }

    reverse() {
        return new Palette([...this.colors].reverse())
    }

    shuffle() {
        const arr = [...this.colors]
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return new Palette(arr)
    }

    sortByHue() {
        return new Palette([...this.colors].sort((a, b) => a.toHSL().h - b.toHSL().h))
    }

    sortByLuminance() {
        return new Palette([...this.colors].sort((a, b) => a.luminance() - b.luminance()))
    }

    lighten(n = 10) {
        return new Palette(this.colors.map(c => c.lighten(n)))
    }

    darken(n = 10) {
        return new Palette(this.colors.map(c => c.darken(n)))
    }

    toHex() {
        return this.colors.map(c => c.toHex())
    }

    toRGB() {
        return this.colors.map(c => c.toRGB())
    }

    forEach(fn) {
        this.colors.forEach(fn)
    }

    map(fn) {
        return new Palette(this.colors.map(fn))
    }

    *[Symbol.iterator]() {
        yield* this.colors
    }
}

export function palette(input) {
    if (input instanceof Palette) return input
    if (Array.isArray(input)) return new Palette(input)
    return new Palette()
}
