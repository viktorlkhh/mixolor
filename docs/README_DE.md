# Mixolor

<a href="#schnellstart">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_1.png"
    width="200" align="right" alt="Vorschau" />
</a>

Mixolor ist eine leichtgewichtige, abhaengigkeitsfreie Farbmanipulationsbibliothek fuer JavaScript.
Sie koennen Farben parsen, zwischen Formaten konvertieren, Paletten generieren, Farben mischen und vieles mehr.

Ideal fuer Design-Tools, Datenvisualisierung, Theme-Systeme, Barrierefreiheitspruefer und Terminal-Styling.
Sie koennen es auch verwenden, um Farbwaehler, Bildverarbeiter oder jedes Projekt zu erstellen, das mit Farben arbeitet.

Mixolor ist als ES-Modul verfuegbar und funktioniert in Node.js und modernen Browsern.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)

## Funktionen

- parst Farben aus HEX, RGB, HSL, HSV und ueber 140 benannten CSS-Farben
- konvertiert zwischen Farbräumen (RGB, HSL, HSV, LAB, HEX)
- manipuliert Farben: aufhellen, abdunkeln, saettigen, entsaettigen, drehen, invertieren
- Mischmodi: multiplizieren, negativ multiplizieren, ueberlagern, weiches Licht, hartes Licht, Differenz
- wendet Filter an: Sepia, Vintage, warm, kalt
- generiert harmonische Paletten: komplementaer, triadisch, analog, tetradisch
- Material Design Paletten enthalten
- simuliert Farbenblindheit: Protanopie, Deuteranopie, Tritanopie
- berechnet Kontrastverhaeltnis (WCAG) und Farbabstand (Delta E)
- erstellt Mehrpunkt-Verlaeufe mit CSS-Export
- konvertiert aus Farbtemperatur (Kelvin) und Lichtwaellenlaenge (nm)
- Terminal-Styling mit ANSI-Farben, fett, kursiv, unterstrichen, Verlaeufe
- findet den naechsten CSS-Farbnamen fuer jede Farbe
- keine Abhaengigkeiten, reines JavaScript

<p align="center">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_2.png" width="600" alt="Terminal-Demo" />
</p>

## Installation

```bash
npm install mixolor
```

Oder aus dem Quellcode klonen:

```bash
git clone https://github.com/viktorlkhh/mixolor.git
cd mixolor
npm install
```

## Verwendung

Schreiben Sie Ihren Farbcode in eine Datei `main.js`:

```javascript
import { color, Gradient, Palette } from 'mixolor'

var cyan = color('#54daf4')
console.log(cyan.toRGB())
console.log(cyan.lighten(20).toHex())
console.log(cyan.name())

var palette = Palette.from(cyan, 'triadic')
console.log(palette.toHex())

var verlauf = Gradient.sunset()
console.log(verlauf.toCSS('right'))
```

Starten Sie mit:

```bash
node main.js
```

Fuehren Sie die Demo aus, um alle Funktionen zu sehen:

```bash
npm run demo
```

## Dokumentation

### Farberstellung

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

### Konvertierung

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
c.contrast(other)       // WCAG-Verhaeltnis
c.distance(other)       // Delta E
```

### Verlaeufe

```javascript
Gradient.create('#54daf4', '#9b59b6')
Gradient.rainbow()
Gradient.sunset()

g.at(0.5)               // Farbe an Position
g.colors(5)             // Array von 5 Farben
g.toCSS('right')        // linear-gradient(to right, ...)
```

### Paletten

```javascript
Palette.from(color, 'complementary')
Palette.from(color, 'triadic')
Palette.material('blue')

p.toHex()
p.sortByHue()
```

### Farbenblindheit

```javascript
import { simulate } from 'mixolor'

simulate(color, 'protanopia')
simulate(color, 'deuteranopia')
simulate(color, 'tritanopia')
```

### Terminal-Styling

```javascript
import { style, colorize, rainbow } from 'mixolor'

styled('fett', style.bold)
colorize('text', 'coral')
rainbow('Regenbogentext!')
```

## Lizenz

MIT
