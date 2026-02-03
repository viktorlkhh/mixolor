# Mixolor

<a href="#demarrage-rapide">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_1.png"
    width="200" align="right" alt="Apercu" />
</a>

Mixolor est une bibliotheque legere de manipulation de couleurs pour JavaScript, sans dependances.
Vous pouvez analyser des couleurs, convertir entre formats, generer des palettes, melanger des couleurs et bien plus encore.

Ideal pour les outils de design, la visualisation de donnees, les systemes de themes, les verificateurs d'accessibilite et le style de terminal.
Vous pouvez egalement l'utiliser pour creer des selecteurs de couleurs, des processeurs d'images ou tout projet travaillant avec des couleurs.

Mixolor est disponible en tant que module ES et fonctionne dans Node.js et les navigateurs modernes.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Licence](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)

## Fonctionnalites

- analyse les couleurs HEX, RGB, HSL, HSV et plus de 140 couleurs CSS nommees
- convertit entre les espaces colorimétriques (RGB, HSL, HSV, LAB, HEX)
- manipule les couleurs: eclaircir, assombrir, saturer, desaturer, pivoter, inverser
- modes de fusion: multiplier, ecran, superposition, lumiere douce, lumiere dure, difference
- applique des filtres: sepia, vintage, chaud, froid
- genere des palettes harmonieuses: complementaire, triadique, analogue, tetradique
- palettes Material Design incluses
- simule le daltonisme: protanopie, deuteranopie, tritanopie
- calcule le rapport de contraste (WCAG) et la distance de couleur (Delta E)
- cree des degrades multi-arrets avec export CSS
- convertit depuis la temperature de couleur (Kelvin) et la longueur d'onde (nm)
- styles de terminal avec couleurs ANSI, gras, italique, souligne, degrades
- trouve le nom de couleur CSS le plus proche pour n'importe quelle couleur
- zero dependances, JavaScript pur

<p align="center">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_2.png" width="600" alt="Demo terminal" />
</p>

## Installation

```bash
npm install mixolor
```

Ou cloner depuis les sources:

```bash
git clone https://github.com/viktorlkhh/mixolor.git
cd mixolor
npm install
```

## Utilisation

Ecrivez votre code couleur dans un fichier `main.js`:

```javascript
import { color, Gradient, Palette } from 'mixolor'

var cyan = color('#54daf4')
console.log(cyan.toRGB())
console.log(cyan.lighten(20).toHex())
console.log(cyan.name())

var palette = Palette.from(cyan, 'triadic')
console.log(palette.toHex())

var degrade = Gradient.sunset()
console.log(degrade.toCSS('right'))
```

Lancez avec:

```bash
node main.js
```

Executez la demo pour voir toutes les fonctionnalites:

```bash
npm run demo
```

## Documentation

### Creation de Couleurs

```javascript
Color.fromHex('#54daf4')
Color.fromRGB(84, 218, 244)
Color.fromHSL(190, 88, 64)
Color.fromKelvin(6500)
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

### Manipulation

```javascript
c.lighten(20)           c.darken(20)
c.saturate(20)          c.desaturate(20)
c.rotate(180)           c.complement()
c.invert()              c.grayscale()
c.mix(other, 0.5)       c.blend(other, 'screen')
```

### Analyse

```javascript
c.luminance()           // 0.0 - 1.0
c.brightness()          // 0 - 255
c.isDark()              // true/false
c.contrast(other)       // ratio WCAG
c.distance(other)       // Delta E
```

### Degrades

```javascript
Gradient.create('#54daf4', '#9b59b6')
Gradient.rainbow()
Gradient.sunset()

g.at(0.5)               // couleur a la position
g.colors(5)             // tableau de 5 couleurs
g.toCSS('right')        // linear-gradient(to right, ...)
```

### Palettes

```javascript
Palette.from(color, 'complementary')
Palette.from(color, 'triadic')
Palette.material('blue')

p.toHex()
p.sortByHue()
```

### Daltonisme

```javascript
import { simulate } from 'mixolor'

simulate(color, 'protanopia')
simulate(color, 'deuteranopia')
simulate(color, 'tritanopia')
```

### Styles de Terminal

```javascript
import { style, colorize, rainbow } from 'mixolor'

styled('gras', style.bold)
colorize('texte', 'coral')
rainbow('Texte arc-en-ciel!')
```

## Licence

MIT
