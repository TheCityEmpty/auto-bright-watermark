

# auto-bright-watermark.js

[auto-bright-watermark.js的github](https://github.com/TheCityEmpty/auto-bright-watermark)

**一个图片水印自动生成器**

安装

```bash
npm i auto-bright-watermark
```

使用
```js
import AutoBrightWatermark from 'auto-bright-watermark'

new AutoBrightWatermark({ ...options })
```

## 先看看效果吧

下载本项目，并安装依赖运行
```bash
git clone https://github.com/TheCityEmpty/auto-bright-watermark.git

npm install

npm run dev
```

<img :src="$withBase('/bright-watermark.png')" data-water style="width: 500px;height: 300px;" alt="水印图">

从左至右，从上至下 分别为

```html
<img src="1.jpg" width="400" data-water />
<img src="1.jpg" width="400" data-water1 />
<img src="1.jpg" width="400" data-water2 />
<img src="1.jpg" width="400" data-water3 />
```

```js
// 重复文字 水印
import AutoWatermark from './auto-bright-watermark.js'

new AutoWatermark({
  rotate: -25,
  contentSize: {
    width: 200,
    height: 100
  }
})
```

```js
// 单个文字 水印
import AutoWatermark from './auto-bright-watermark.js'

new AutoWatermark({
  repeat: false,
  rotate: -5,
  dataWater: 'water1',
  contentSize: {
    width: 500,
    height: 180
  }
})
```

```js
// 重复图片 水印
import AutoWatermark from './auto-bright-watermark.js'
import p from '../2.png'

new AutoWatermark({
  rotate: -25,
  contentImg: p,
  contentSize: {
    width: 170,
    height: 100
  },
  dataWater: 'water2'
})
```

```js
// 单个图片 水印
import AutoWatermark from './auto-bright-watermark.js'
import p from '../2.png'

new AutoWatermark({
  repeat: false,
  rotate: -5,
  contentImg: p,
  dataWater: 'water3',
  contentSize: {
    width: 570,
    height: 100
  }
})
```

## options

| options        | 说明           | 类型  | 默认值  |
| ------------- |:-------------:| -----:| ------:|
| content      | 当水印为文字的时候的内容 | String |  watermark      |
| dataWater      | 给 img 标签添加attr, 如: data-water, 用于识别哪些图片需要加水印      |  String |  water      |
| contentSize | 水印内容大小， 一次水印所占大小，用于计算一张图片需要重复多少次水印   |   Object |  contentSize = { width: 200,height:100}|
| repeat | 是否重复水印   |   Boolean |   true    |
| rotate | 水印旋转角度(支持负值)   |   String  | -10 |
| color | 水印颜色   |   String |   rgba(255, 255, 255, 0.2)     |
| bold | 字体是否加粗   |   Boolean |   true     |
| fontSize | 字体大小   |   String |   20px     |
| globalAlpha | 图片透明度  0.0  （完全透明）和 1.0 （完全不透明）之间   |   Number |   0.2     |


## 看看实际网站效果吧

以下网站采用了 `auto-bright-watermark.js`

* [https://thecityempty.github.io/vuepress-blog-lxh/](https://thecityempty.github.io/vuepress-blog-lxh/)
