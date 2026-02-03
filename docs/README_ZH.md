# Mixolor

<a href="#快速开始">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_1.png"
    width="200" align="right" alt="预览" />
</a>

Mixolor 是一个轻量级、无依赖的 JavaScript 颜色处理库。
您可以解析颜色、转换格式、生成调色板、混合颜色等等。

非常适合设计工具、数据可视化、主题系统、无障碍检查器和终端样式。
您还可以用它来构建颜色选择器、图像处理器或任何处理颜色的项目。

Mixolor 作为 ES 模块提供，可在 Node.js 和现代浏览器中运行。

![版本](https://img.shields.io/badge/version-1.0.0-blue)
![许可证](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)

## 功能特性

- 解析 HEX、RGB、HSL、HSV 和 140+ CSS 命名颜色
- 在颜色空间之间转换（RGB、HSL、HSV、LAB、HEX）
- 颜色操作：变亮、变暗、饱和、去饱和、旋转、反转
- 混合模式：正片叠底、滤色、叠加、柔光、强光、差值
- 应用滤镜：复古、暖色、冷色
- 生成和谐调色板：互补色、三色、类似色、四色
- 内置 Material Design 调色板
- 模拟色盲：红色盲、绿色盲、蓝色盲
- 计算对比度（WCAG）和颜色距离（Delta E）
- 创建多节点渐变并导出 CSS
- 从色温（开尔文）和光波长（纳米）转换
- 终端样式：ANSI 颜色、粗体、斜体、下划线、渐变
- 查找任何颜色最接近的 CSS 颜色名称
- 零依赖，纯 JavaScript

<p align="center">
  <img src="https://raw.githubusercontent.com/viktorlkhh/mixolor/main/pictures/example_2.png" width="600" alt="终端演示" />
</p>

## 安装

```bash
npm install mixolor
```

或从源代码克隆：

```bash
git clone https://github.com/viktorlkhh/mixolor.git
cd mixolor
npm install
```

## 使用方法

在 `main.js` 文件中编写颜色代码：

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

运行：

```bash
node main.js
```

运行演示以查看所有功能：

```bash
npm run demo
```

## 文档

### 创建颜色

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

### 转换

```javascript
c.toHex()       // '#54daf4'
c.toRGB()       // 'rgb(84, 218, 244)'
c.toHSL()       // { h: 190, s: 88, l: 64 }
c.toLAB()       // { l: 82, a: -23, b: -18 }
c.name()        // 'turquoise'
```

### 操作

```javascript
c.lighten(20)           c.darken(20)
c.saturate(20)          c.desaturate(20)
c.rotate(180)           c.complement()
c.invert()              c.grayscale()
c.mix(other, 0.5)       c.blend(other, 'screen')
```

### 分析

```javascript
c.luminance()           // 0.0 - 1.0
c.brightness()          // 0 - 255
c.isDark()              // true/false
c.contrast(other)       // WCAG 比率
c.distance(other)       // Delta E
```

### 渐变

```javascript
Gradient.create('#54daf4', '#9b59b6')
Gradient.rainbow()
Gradient.sunset()

g.at(0.5)               // 位置处的颜色
g.colors(5)             // 5 个颜色的数组
g.toCSS('right')        // linear-gradient(to right, ...)
```

### 调色板

```javascript
Palette.from(color, 'complementary')
Palette.from(color, 'triadic')
Palette.material('blue')

p.toHex()
p.sortByHue()
```

### 色盲模拟

```javascript
import { simulate } from 'mixolor'

simulate(color, 'protanopia')
simulate(color, 'deuteranopia')
simulate(color, 'tritanopia')
```

### 终端样式

```javascript
import { style, colorize, rainbow } from 'mixolor'

styled('粗体', style.bold)
colorize('文本', 'coral')
rainbow('彩虹文本!')
```

## 许可证

MIT
