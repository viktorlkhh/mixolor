# Mixolor

<a href="#быстрый-старт">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_1.png"
    width="200" align="right" alt="Превью" />
</a>

Mixolor — это легковесная библиотека для работы с цветами на JavaScript без зависимостей.
Вы можете парсить цвета, конвертировать между форматами, генерировать палитры, смешивать цвета и многое другое.

Отлично подходит для инструментов дизайна, визуализации данных, систем тем, проверки доступности и стилизации терминала.
Также можно использовать для создания пикеров цвета, обработчиков изображений или любого проекта, работающего с цветами.

Mixolor доступен как ES-модуль и работает в Node.js и современных браузерах.

![Версия](https://img.shields.io/badge/version-1.0.0-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)

## Возможности

- парсинг цветов из HEX, RGB, HSL, HSV и 140+ именованных CSS-цветов
- конвертация между цветовыми пространствами (RGB, HSL, HSV, LAB, HEX)
- манипуляции с цветами: осветление, затемнение, насыщение, обесцвечивание, поворот, инверсия
- режимы наложения: умножение, экран, перекрытие, мягкий свет, жёсткий свет, разница
- применение фильтров: сепия, винтаж, тёплый, холодный
- генерация гармоничных палитр: комплементарная, триадная, аналоговая, тетрадная
- палитры Material Design из коробки
- симуляция дальтонизма: протанопия, дейтеранопия, тританопия
- расчёт контрастности (WCAG) и цветового расстояния (Delta E)
- создание многоточечных градиентов с экспортом в CSS
- конвертация из цветовой температуры (Кельвин) и длины волны света (нм)
- стилизация терминала: ANSI-цвета, жирный, курсив, подчёркивание, градиенты
- поиск ближайшего имени CSS-цвета для любого цвета
- ноль зависимостей, чистый JavaScript

<p align="center">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_2.png" width="600" alt="Демо в терминале" />
</p>

## Установка

```bash
npm install mixolor
```

Или клонировать из исходников:

```bash
git clone https://github.com/viktorlkhh/mixolor.git
cd mixolor
npm install
```

## Использование

Напишите код для работы с цветом в файле `main.js`:

```javascript
import { color, Gradient, Palette } from 'mixolor'

var cyan = color('#54daf4')
console.log(cyan.toRGB())
console.log(cyan.lighten(20).toHex())
console.log(cyan.name())

var palette = Palette.from(cyan, 'triadic')
console.log(palette.toHex())

var gradient = Gradient.sunset()
console.log(gradient.toCSS('right'))
```

Запустите:

```bash
node main.js
```

Запустите демо, чтобы увидеть все возможности:

```bash
npm run demo
```

## Документация

### Создание цветов

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

### Конвертация

```javascript
c.toHex()       // '#54daf4'
c.toRGB()       // 'rgb(84, 218, 244)'
c.toHSL()       // { h: 190, s: 88, l: 64 }
c.toLAB()       // { l: 82, a: -23, b: -18 }
c.name()        // 'turquoise'
```

### Манипуляции

```javascript
c.lighten(20)           c.darken(20)
c.saturate(20)          c.desaturate(20)
c.rotate(180)           c.complement()
c.invert()              c.grayscale()
c.mix(other, 0.5)       c.blend(other, 'screen')
```

### Анализ

```javascript
c.luminance()           // 0.0 - 1.0
c.brightness()          // 0 - 255
c.isDark()              // true/false
c.contrast(other)       // коэффициент WCAG
c.distance(other)       // Delta E
```

### Градиенты

```javascript
Gradient.create('#54daf4', '#9b59b6')
Gradient.rainbow()
Gradient.sunset()

g.at(0.5)               // цвет в позиции
g.colors(5)             // массив из 5 цветов
g.toCSS('right')        // linear-gradient(to right, ...)
```

### Палитры

```javascript
Palette.from(color, 'complementary')
Palette.from(color, 'triadic')
Palette.material('blue')

p.toHex()
p.sortByHue()
```

### Симуляция дальтонизма

```javascript
import { simulate } from 'mixolor'

simulate(color, 'protanopia')
simulate(color, 'deuteranopia')
simulate(color, 'tritanopia')
```

### Стили терминала

```javascript
import { style, colorize, rainbow } from 'mixolor'

styled('жирный', style.bold)
colorize('текст', 'coral')
rainbow('Радужный текст!')
```

## Лицензия

MIT
