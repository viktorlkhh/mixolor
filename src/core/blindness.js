import { Color } from './color.js'

const matrices = {
    protanopia: [
        [0.567, 0.433, 0.000],
        [0.558, 0.442, 0.000],
        [0.000, 0.242, 0.758]
    ],
    deuteranopia: [
        [0.625, 0.375, 0.000],
        [0.700, 0.300, 0.000],
        [0.000, 0.300, 0.700]
    ],
    tritanopia: [
        [0.950, 0.050, 0.000],
        [0.000, 0.433, 0.567],
        [0.000, 0.475, 0.525]
    ],
    achromatopsia: [
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114],
        [0.299, 0.587, 0.114]
    ],
    protanomaly: [
        [0.817, 0.183, 0.000],
        [0.333, 0.667, 0.000],
        [0.000, 0.125, 0.875]
    ],
    deuteranomaly: [
        [0.800, 0.200, 0.000],
        [0.258, 0.742, 0.000],
        [0.000, 0.142, 0.858]
    ],
    tritanomaly: [
        [0.967, 0.033, 0.000],
        [0.000, 0.733, 0.267],
        [0.000, 0.183, 0.817]
    ]
}

export function simulate(color, type = 'deuteranopia') {
    const c = color instanceof Color ? color : Color.fromHex(color)
    const m = matrices[type]
    
    if (!m) return c.clone()
    
    const r = c.r / 255
    const g = c.g / 255
    const b = c.b / 255
    
    return new Color(
        (m[0][0] * r + m[0][1] * g + m[0][2] * b) * 255,
        (m[1][0] * r + m[1][1] * g + m[1][2] * b) * 255,
        (m[2][0] * r + m[2][1] * g + m[2][2] * b) * 255,
        c.a
    )
}

export function isDistinguishable(color1, color2, type = 'deuteranopia', threshold = 20) {
    const sim1 = simulate(color1, type)
    const sim2 = simulate(color2, type)
    
    const dr = sim1.r - sim2.r
    const dg = sim1.g - sim2.g
    const db = sim1.b - sim2.b
    
    return Math.sqrt(dr * dr + dg * dg + db * db) > threshold
}

export const types = Object.keys(matrices)
