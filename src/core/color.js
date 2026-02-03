import { clamp, clamp01, clamp255, lerp } from '../utils/clamp.js'
import { parseHex, toHex } from '../utils/parse.js'
import { getNamedColor, isNamedColor, findColorName, findClosestColorName } from '../data/named-colors.js'

export class Color {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = clamp255(r)
        this.g = clamp255(g)
        this.b = clamp255(b)
        this.a = clamp01(a)
    }

    static fromHex(hex) {
        var parsed = parseHex(hex)
        return new Color(parsed.r, parsed.g, parsed.b, parsed.a)
    }

    static fromRGB(r, g, b, a) {
        return new Color(r, g, b, a !== undefined ? a : 1)
    }

    static fromHSL(h, s, l, alpha) {
        h = ((h % 360) + 360) % 360
        s = clamp(s, 0, 100) / 100
        l = clamp(l, 0, 100) / 100

        var chroma = (1 - Math.abs(2 * l - 1)) * s
        var x = chroma * (1 - Math.abs((h / 60) % 2 - 1))
        var m = l - chroma / 2

        var r, g, b
        if (h < 60) {
            r = chroma; g = x; b = 0
        } else if (h < 120) {
            r = x; g = chroma; b = 0
        } else if (h < 180) {
            r = 0; g = chroma; b = x
        } else if (h < 240) {
            r = 0; g = x; b = chroma
        } else if (h < 300) {
            r = x; g = 0; b = chroma
        } else {
            r = chroma; g = 0; b = x
        }

        return new Color(
            (r + m) * 255,
            (g + m) * 255,
            (b + m) * 255,
            alpha !== undefined ? alpha : 1
        )
    }

    static fromHSV(h, s, v, alpha) {
        h = ((h % 360) + 360) % 360
        s = clamp(s, 0, 100) / 100
        v = clamp(v, 0, 100) / 100

        var chroma = v * s
        var x = chroma * (1 - Math.abs((h / 60) % 2 - 1))
        var m = v - chroma

        var r, g, b
        if (h < 60) {
            r = chroma; g = x; b = 0
        } else if (h < 120) {
            r = x; g = chroma; b = 0
        } else if (h < 180) {
            r = 0; g = chroma; b = x
        } else if (h < 240) {
            r = 0; g = x; b = chroma
        } else if (h < 300) {
            r = x; g = 0; b = chroma
        } else {
            r = chroma; g = 0; b = x
        }

        return new Color(
            (r + m) * 255,
            (g + m) * 255,
            (b + m) * 255,
            alpha !== undefined ? alpha : 1
        )
    }

    static random() {
        var r = Math.floor(Math.random() * 256)
        var g = Math.floor(Math.random() * 256)
        var b = Math.floor(Math.random() * 256)
        return new Color(r, g, b)
    }

    static randomPastel() {
        var hue = Math.random() * 360
        var sat = 60 + Math.random() * 20
        var light = 75 + Math.random() * 10
        return Color.fromHSL(hue, sat, light)
    }

    static randomVibrant() {
        var hue = Math.random() * 360
        var sat = 80 + Math.random() * 20
        var light = 45 + Math.random() * 15
        return Color.fromHSL(hue, sat, light)
    }

    static fromKelvin(kelvin) {
        var temp = clamp(kelvin, 1000, 40000) / 100
        var r, g, b

        if (temp <= 66) {
            r = 255
            g = 99.4708025861 * Math.log(temp) - 161.1195681661
        } else {
            r = 329.698727446 * Math.pow(temp - 60, -0.1332047592)
            g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492)
        }

        if (temp >= 66) {
            b = 255
        } else if (temp <= 19) {
            b = 0
        } else {
            b = 138.5177312231 * Math.log(temp - 10) - 305.0447927307
        }

        return new Color(r, g, b)
    }

    static fromWavelength(wavelength) {
        var r = 0, g = 0, b = 0
        var nm = wavelength

        if (nm >= 380 && nm < 440) {
            r = (440 - nm) / 60
            b = 1
        } else if (nm >= 440 && nm < 490) {
            g = (nm - 440) / 50
            b = 1
        } else if (nm >= 490 && nm < 510) {
            g = 1
            b = (510 - nm) / 20
        } else if (nm >= 510 && nm < 580) {
            r = (nm - 510) / 70
            g = 1
        } else if (nm >= 580 && nm < 645) {
            r = 1
            g = (645 - nm) / 65
        } else if (nm >= 645 && nm <= 780) {
            r = 1
        }

        var intensity = 1
        if (nm >= 380 && nm < 420) {
            intensity = 0.3 + 0.7 * (nm - 380) / 40
        } else if (nm > 700 && nm <= 780) {
            intensity = 0.3 + 0.7 * (780 - nm) / 80
        } else if (nm < 380 || nm > 780) {
            intensity = 0
        }

        return new Color(
            r * intensity * 255,
            g * intensity * 255,
            b * intensity * 255
        )
    }

    clone() {
        return new Color(this.r, this.g, this.b, this.a)
    }

    toHex(withAlpha) {
        var hex = '#' + toHex(this.r) + toHex(this.g) + toHex(this.b)
        if (withAlpha) {
            hex += toHex(Math.round(this.a * 255))
        }
        return hex
    }

    toRGB() {
        if (this.a < 1) {
            return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a.toFixed(2) + ')'
        }
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')'
    }

    toHSL() {
        var r = this.r / 255
        var g = this.g / 255
        var b = this.b / 255

        var max = Math.max(r, g, b)
        var min = Math.min(r, g, b)
        var l = (max + min) / 2
        var h = 0
        var s = 0

        if (max !== min) {
            var d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

            if (max === r) {
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6
            } else if (max === g) {
                h = ((b - r) / d + 2) / 6
            } else {
                h = ((r - g) / d + 4) / 6
            }
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        }
    }

    toHSV() {
        var r = this.r / 255
        var g = this.g / 255
        var b = this.b / 255

        var max = Math.max(r, g, b)
        var min = Math.min(r, g, b)
        var d = max - min
        var h = 0
        var s = max === 0 ? 0 : d / max

        if (max !== min) {
            if (max === r) {
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6
            } else if (max === g) {
                h = ((b - r) / d + 2) / 6
            } else {
                h = ((r - g) / d + 4) / 6
            }
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            v: Math.round(max * 100)
        }
    }

    toArray() {
        return [this.r, this.g, this.b, this.a]
    }

    toObject() {
        return { r: this.r, g: this.g, b: this.b, a: this.a }
    }

    toLAB() {
        var r = this.r / 255
        var g = this.g / 255
        var b = this.b / 255

        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

        var x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
        var y = (r * 0.2126 + g * 0.7152 + b * 0.0722)
        var z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883

        x = x > 0.008856 ? Math.pow(x, 1/3) : 7.787 * x + 16/116
        y = y > 0.008856 ? Math.pow(y, 1/3) : 7.787 * y + 16/116
        z = z > 0.008856 ? Math.pow(z, 1/3) : 7.787 * z + 16/116

        return {
            l: 116 * y - 16,
            a: 500 * (x - y),
            b: 200 * (y - z)
        }
    }

    distance(other) {
        var lab1 = this.toLAB()
        var lab2 = other.toLAB()
        var dl = lab1.l - lab2.l
        var da = lab1.a - lab2.a
        var db = lab1.b - lab2.b
        return Math.sqrt(dl * dl + da * da + db * db)
    }

    isSimilar(other, threshold) {
        var t = threshold !== undefined ? threshold : 10
        return this.distance(other) < t
    }

    luminance() {
        var rLinear = this.r / 255
        var gLinear = this.g / 255
        var bLinear = this.b / 255

        rLinear = rLinear <= 0.03928 ? rLinear / 12.92 : Math.pow((rLinear + 0.055) / 1.055, 2.4)
        gLinear = gLinear <= 0.03928 ? gLinear / 12.92 : Math.pow((gLinear + 0.055) / 1.055, 2.4)
        bLinear = bLinear <= 0.03928 ? bLinear / 12.92 : Math.pow((bLinear + 0.055) / 1.055, 2.4)

        return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
    }

    brightness() {
        return (this.r * 299 + this.g * 587 + this.b * 114) / 1000
    }

    isDark() {
        return this.brightness() < 128
    }

    isLight() {
        return this.brightness() >= 128
    }

    contrast(other) {
        var l1 = this.luminance()
        var l2 = other.luminance()
        var lighter = Math.max(l1, l2)
        var darker = Math.min(l1, l2)
        return (lighter + 0.05) / (darker + 0.05)
    }

    mix(other, ratio) {
        var t = ratio !== undefined ? clamp01(ratio) : 0.5
        return new Color(
            lerp(this.r, other.r, t),
            lerp(this.g, other.g, t),
            lerp(this.b, other.b, t),
            lerp(this.a, other.a, t)
        )
    }

    lighten(amount) {
        var hsl = this.toHSL()
        var newL = Math.min(100, hsl.l + (amount || 10))
        return Color.fromHSL(hsl.h, hsl.s, newL, this.a)
    }

    darken(amount) {
        var hsl = this.toHSL()
        var newL = Math.max(0, hsl.l - (amount || 10))
        return Color.fromHSL(hsl.h, hsl.s, newL, this.a)
    }

    saturate(amount) {
        var hsl = this.toHSL()
        var newS = Math.min(100, hsl.s + (amount || 10))
        return Color.fromHSL(hsl.h, newS, hsl.l, this.a)
    }

    desaturate(amount) {
        var hsl = this.toHSL()
        var newS = Math.max(0, hsl.s - (amount || 10))
        return Color.fromHSL(hsl.h, newS, hsl.l, this.a)
    }

    grayscale() {
        var gray = Math.round(this.r * 0.299 + this.g * 0.587 + this.b * 0.114)
        return new Color(gray, gray, gray, this.a)
    }

    invert() {
        return new Color(255 - this.r, 255 - this.g, 255 - this.b, this.a)
    }

    rotate(degrees) {
        var hsl = this.toHSL()
        var newHue = (hsl.h + degrees + 360) % 360
        return Color.fromHSL(newHue, hsl.s, hsl.l, this.a)
    }

    complement() {
        return this.rotate(180)
    }

    alpha(value) {
        return new Color(this.r, this.g, this.b, value)
    }

    equals(other) {
        return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a
    }

    blend(other, mode) {
        var blendMode = mode || 'multiply'
        var srcR = this.r / 255
        var srcG = this.g / 255
        var srcB = this.b / 255
        var dstR = other.r / 255
        var dstG = other.g / 255
        var dstB = other.b / 255

        var blendChannel
        switch (blendMode) {
            case 'multiply':
                blendChannel = function(a, b) { return a * b }
                break
            case 'screen':
                blendChannel = function(a, b) { return 1 - (1 - a) * (1 - b) }
                break
            case 'overlay':
                blendChannel = function(a, b) { return a < 0.5 ? 2 * a * b : 1 - 2 * (1 - a) * (1 - b) }
                break
            case 'soft-light':
                blendChannel = function(a, b) {
                    if (b < 0.5) return a - (1 - 2 * b) * a * (1 - a)
                    var d = a < 0.25 ? ((16 * a - 12) * a + 4) * a : Math.sqrt(a)
                    return a + (2 * b - 1) * (d - a)
                }
                break
            case 'hard-light':
                blendChannel = function(a, b) { return b < 0.5 ? 2 * a * b : 1 - 2 * (1 - a) * (1 - b) }
                break
            case 'difference':
                blendChannel = function(a, b) { return Math.abs(a - b) }
                break
            case 'exclusion':
                blendChannel = function(a, b) { return a + b - 2 * a * b }
                break
            case 'darken':
                blendChannel = function(a, b) { return Math.min(a, b) }
                break
            case 'lighten':
                blendChannel = function(a, b) { return Math.max(a, b) }
                break
            default:
                blendChannel = function(a, b) { return a * b }
        }

        return new Color(
            blendChannel(srcR, dstR) * 255,
            blendChannel(srcG, dstG) * 255,
            blendChannel(srcB, dstB) * 255,
            this.a
        )
    }

    sepia(strength) {
        var t = clamp(strength !== undefined ? strength : 100, 0, 100) / 100
        var r = this.r / 255
        var g = this.g / 255
        var b = this.b / 255

        var sepiaR = Math.min(1, 0.393 * r + 0.769 * g + 0.189 * b)
        var sepiaG = Math.min(1, 0.349 * r + 0.686 * g + 0.168 * b)
        var sepiaB = Math.min(1, 0.272 * r + 0.534 * g + 0.131 * b)

        return new Color(
            (r + (sepiaR - r) * t) * 255,
            (g + (sepiaG - g) * t) * 255,
            (b + (sepiaB - b) * t) * 255,
            this.a
        )
    }

    vintage() {
        return this.sepia(40).desaturate(20).darken(5)
    }

    warm(strength) {
        var t = clamp(strength !== undefined ? strength : 20, 0, 100) / 100
        return new Color(
            Math.min(255, this.r + 30 * t),
            this.g,
            Math.max(0, this.b - 20 * t),
            this.a
        )
    }

    cool(strength) {
        var t = clamp(strength !== undefined ? strength : 20, 0, 100) / 100
        return new Color(
            Math.max(0, this.r - 20 * t),
            this.g,
            Math.min(255, this.b + 30 * t),
            this.a
        )
    }

    name(exactOnly) {
        var hex = this.toHex()
        var exactMatch = findColorName(hex)
        if (exactMatch) return exactMatch
        if (exactOnly) return null
        var closest = findClosestColorName(this.r, this.g, this.b)
        return closest.name
    }

    toString() {
        return this.toHex()
    }
}

export function color(input) {
    if (input instanceof Color) {
        return input.clone()
    }

    if (typeof input === 'string') {
        var str = input.trim()

        if (str.charAt(0) === '#') {
            return Color.fromHex(str)
        }

        var rgbMatch = str.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/i)
        if (rgbMatch) {
            return new Color(
                parseInt(rgbMatch[1], 10),
                parseInt(rgbMatch[2], 10),
                parseInt(rgbMatch[3], 10),
                rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1
            )
        }

        var hslMatch = str.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*(?:,\s*([\d.]+))?\s*\)$/i)
        if (hslMatch) {
            return Color.fromHSL(
                parseInt(hslMatch[1], 10),
                parseInt(hslMatch[2], 10),
                parseInt(hslMatch[3], 10),
                hslMatch[4] ? parseFloat(hslMatch[4]) : 1
            )
        }

        if (isNamedColor(str)) {
            return Color.fromHex(getNamedColor(str))
        }

        return Color.fromHex(str)
    }

    if (Array.isArray(input)) {
        return new Color(input[0], input[1], input[2], input[3])
    }

    return new Color()
}
