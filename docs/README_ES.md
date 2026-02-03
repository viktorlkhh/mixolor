# Mixolor

<a href="#inicio-rapido">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_1.png"
    width="200" align="right" alt="Vista previa" />
</a>

Mixolor es una biblioteca ligera de manipulacion de colores para JavaScript, sin dependencias.
Puedes analizar colores, convertir entre formatos, generar paletas, mezclar colores y mucho mas.

Es ideal para herramientas de diseno, visualizacion de datos, sistemas de temas, verificadores de accesibilidad y estilos de terminal.
Tambien puedes usarlo para crear selectores de color, procesadores de imagenes o cualquier proyecto que trabaje con colores.

Mixolor esta disponible como modulo ES y funciona en Node.js y navegadores modernos.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Licencia](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)

## Caracteristicas

- analiza colores desde HEX, RGB, HSL, HSV y mas de 140 colores CSS con nombre
- convierte entre espacios de color (RGB, HSL, HSV, LAB, HEX)
- manipula colores: aclarar, oscurecer, saturar, desaturar, rotar, invertir
- modos de mezcla: multiplicar, pantalla, superposicion, luz suave, luz dura, diferencia
- aplica filtros: sepia, vintage, calido, frio
- genera paletas armonicas: complementario, triadico, analogo, tetradico
- paletas de Material Design incluidas
- simula daltonismo: protanopia, deuteranopia, tritanopia
- calcula relacion de contraste (WCAG) y distancia de color (Delta E)
- crea degradados con multiples paradas y exportacion CSS
- convierte desde temperatura de color (Kelvin) y longitud de onda (nm)
- estilos de terminal con colores ANSI, negrita, cursiva, subrayado, degradados
- encuentra el nombre de color CSS mas cercano para cualquier color
- cero dependencias, JavaScript puro

<p align="center">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_2.png" width="600" alt="Demo en terminal" />
</p>

## Instalacion

```bash
npm install mixolor
```

O clonar desde el codigo fuente:

```bash
git clone https://github.com/viktorlkhh/mixolor.git
cd mixolor
npm install
```

## Uso

Escribe tu codigo de color en un archivo `main.js`:

```javascript
import { color, Gradient, Palette } from 'mixolor'

var cian = color('#54daf4')
console.log(cian.toRGB())
console.log(cian.lighten(20).toHex())
console.log(cian.name())

var paleta = Palette.from(cian, 'triadic')
console.log(paleta.toHex())

var degradado = Gradient.sunset()
console.log(degradado.toCSS('right'))
```

Ejecutalo con:

```bash
node main.js
```

Ejecuta la demo para ver todas las caracteristicas:

```bash
npm run demo
```

## Documentacion

### Creacion de Colores

```javascript
Color.fromHex('#54daf4')
Color.fromRGB(84, 218, 244)
Color.fromHSL(190, 88, 64)
Color.fromKelvin(6500)
Color.fromWavelength(550)
Color.random()

color('#54daf4')
color('rgb(84, 218, 244)')
color('coral')
```

### Conversion

```javascript
c.toHex()       // '#54daf4'
c.toRGB()       // 'rgb(84, 218, 244)'
c.toHSL()       // { h: 190, s: 88, l: 64 }
c.toLAB()       // { l: 82, a: -23, b: -18 }
c.name()        // 'turquoise'
```

### Manipulacion

```javascript
c.lighten(20)           c.darken(20)
c.saturate(20)          c.desaturate(20)
c.rotate(180)           c.complement()
c.invert()              c.grayscale()
c.mix(other, 0.5)       c.blend(other, 'screen')
```

### Analisis

```javascript
c.luminance()           // 0.0 - 1.0
c.brightness()          // 0 - 255
c.isDark()              // true/false
c.contrast(other)       // ratio WCAG
c.distance(other)       // Delta E
```

### Degradados

```javascript
Gradient.create('#54daf4', '#9b59b6')
Gradient.rainbow()
Gradient.sunset()

g.at(0.5)               // color en posicion
g.colors(5)             // array de 5 colores
g.toCSS('right')        // linear-gradient(to right, ...)
```

### Paletas

```javascript
Palette.from(color, 'complementary')
Palette.from(color, 'triadic')
Palette.material('blue')
Palette.random(5)

p.toHex()
p.sortByHue()
```

### Daltonismo

```javascript
import { simulate } from 'mixolor'

simulate(color, 'protanopia')
simulate(color, 'deuteranopia')
simulate(color, 'tritanopia')
```

### Estilos de Terminal

```javascript
import { style, fg, bg, colorize, rainbow } from 'mixolor'

styled('negrita', style.bold)
colorize('texto', 'coral')
rainbow('Texto arcoiris!')
```

## Licencia

MIT
