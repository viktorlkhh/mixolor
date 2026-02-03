import { style, fg, bg, styled, colorize, rainbow, textGradient, box } from '../src/index.js'

console.log('\nText styles:\n')
console.log(styled('Bold text', style.bold))
console.log(styled('Dim text', style.dim))
console.log(styled('Italic text', style.italic))
console.log(styled('Underlined text', style.underline))
console.log(styled('Strikethrough text', style.strikethrough))
console.log(styled('Inverted text', style.inverse))

console.log('\nColors:\n')
console.log(colorize('Red text', '#ff0000'))
console.log(colorize('Green text', '#00ff00'))
console.log(colorize('Blue text', '#0000ff'))
console.log(colorize('Coral text', 'coral'))
console.log(colorize('Custom cyan', '#54daf4'))

console.log('\nBackground colors:\n')
console.log(colorize(' White on red ', 'white', 'red'))
console.log(colorize(' Black on yellow ', 'black', 'yellow'))
console.log(colorize(' White on blue ', 'white', '#0066ff'))

console.log('\nCombined styles:\n')
console.log(styled('Bold + Underline', style.bold, style.underline))
console.log(styled('Bold colored', style.bold, fg('#ff6b6b')))
console.log(styled(' Bold on background ', style.bold, fg('white'), bg('#9b59b6')))

console.log('\nRainbow effect:\n')
console.log(rainbow('This text has rainbow colors!'))
console.log(rainbow('ABCDEFGHIJKLMNOPQRSTUVWXYZ'))

console.log('\nGradient text:\n')
console.log(textGradient('Smooth gradient from cyan to purple', '#54daf4', '#9b59b6'))
console.log(textGradient('Fire gradient effect', '#f12711', '#f5af19'))
console.log(textGradient('Ocean vibes here', '#2193b0', '#6dd5ed'))
console.log(textGradient('Forest theme', '#11998e', '#38ef7d'))

console.log('\nBox:\n')
console.log(box('Hello World!', '#54daf4'))
console.log()
console.log(box('Multi-line\ntext box\nexample', 'coral'))
console.log()
