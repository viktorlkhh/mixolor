export function parseHex(hex) {
    let h = hex.replace(/^#/, '')
    
    if (h.length === 3) {
        h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
    }
    
    if (h.length === 4) {
        h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2] + h[3] + h[3]
    }
    
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
    
    return { r, g, b, a }
}

export function toHex(n) {
    return Math.round(n).toString(16).padStart(2, '0')
}

export function isValidHex(hex) {
    return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hex)
}
