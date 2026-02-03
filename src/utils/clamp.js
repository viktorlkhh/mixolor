export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

export function clamp01(value) {
    return clamp(value, 0, 1)
}

export function clamp255(value) {
    return Math.round(clamp(value, 0, 255))
}

export function lerp(a, b, t) {
    return a + (b - a) * clamp01(t)
}
