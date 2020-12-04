/**
 * @description 自动为网站图片添加明水印
 * @param { String | image } content, contentImg 一个字符串, 一张图片
 * @param { String } dataWater 给 img 标签添加attr, 如: data-water, 用于识别哪些图片需要加水印
 * @param { Object } contentSize 水印内容大小， 一次水印所占大小，用于计算一张图片需要重复多少次水印
 * @param { Boolean } repeat 是否重复水印
 * @param { Number } rotate 水印旋转角度
 * @param { String } color 水印颜色
 * @param { Boolean } bold 字体是否加粗
 * @param { String } fontSize 字体大小
 * @param { Number } globalAlpha 图片透明度  0.0  （完全透明）和 1.0 （完全不透明）之间
 */
export default class AutoBrightWatermark {
  constructor({
    contentImg = '',
    content = 'watermark',
    dataWater = 'water',
    contentSize = {
      width: 200,
      height: 100
    },
    repeat = true,
    rotate = -10,
    color = 'rgba(255, 255, 255, 0.2)',
    bold = true,
    fontSize = '20px',
    globalAlpha = 0.2
  }) {
    console.log('[AutoWatermark] Watermark reslove start...')
    if (this.instance) {
      return this.instance
    }

    this.contentImg = contentImg
    this.content = content
    this.dataWater = dataWater
    this.contentSize = contentSize
    this.repeat = repeat
    this.rotate = rotate
    this.color = color
    this.bold = bold
    this.fontSize = fontSize
    this.globalAlpha = globalAlpha
    this.instance = this
    this.instance.init()
  }

  async init() {
    try {
      const waterImgs = await this.getDataWater()
      await this.resolveImgs(waterImgs)
    } catch (error) {}
  }

  getDataWater() {
    const waterImgs = document.querySelectorAll(`img[data-${this.dataWater}]`)

    return waterImgs ? Promise.resolve(waterImgs) : Promise.reject(this.wariningLog('Get image is empty'))
  }

  resolveImgs(imgs) {
    const that = this
    Array.prototype.forEach.call(imgs, callBack)

    function callBack(item) {
      const img = new Image()
      img.src = item.src

      img.onload = async () => {
        const canvas = document.createElement('canvas')
        const {
          width,
          height
        } = item

        // 绘制出来的图片会模糊， 这里处理后将不再模糊，和原图一样了
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
        canvas.width = width * 2
        canvas.height = height * 2
        const newCtx = canvas.getContext('2d')
        newCtx.scale(2, 2)

        // 开始绘制图片和绘制水印
        newCtx.drawImage(img, 0, 0, item.width, item.height)
        newCtx.translate(that.contentSize.width / -2, that.contentSize.height / -2)
        newCtx.rotate(that.rotate * Math.PI / 180)
        
        if (that.content) {
          newCtx.font = `${that.fontSize} ${that.bold ? 'bold' : ''} serif`
          newCtx.fillStyle = that.color
        }

        const arr = that.calcWatermark(width, height)
        for (let i = 0, len = arr.length; i < len; i++) {
          if (that.contentImg) {
            that.content = ''
            await that.paintImgs(newCtx, arr[i].xp, arr[i].yp)
          }

          if (that.content) {
            that.paintWords(newCtx, arr[i].xp, arr[i].yp)
          }
        }
        

        item.src = canvas.toDataURL()
      }
    }
  }

  paintImgs(newCtx, x, y) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = this.contentImg

      img.onload = () => {
        newCtx.globalAlpha = this.globalAlpha
        newCtx.drawImage(img, x, y, img.width, img.height)
        resolve()
      }
    })
  }

  paintWords(newCtx, x, y) {
    newCtx.fillText(this.content, x, y)
  }

  // 计算水印的次数以及 每次的位置
  calcWatermark(imgWidth, imgHeight) {
    const {
      width: cWidth,
      height: cHeight
    } = this.contentSize

    // 是否重复
    if (!this.repeat) {
      return [{
        xp: cWidth,
        yp: cHeight
      }]
    }
    const x = (imgWidth * 2) / cWidth
    const y = (imgHeight * 2) / cHeight
    let watermarkPositionArr = []

    for (let j = 0; j < x; j++) {
      for (let z = 0; z < y; z++) {
        watermarkPositionArr.push({
          xp: j * cWidth,
          yp: z * cHeight
        })
      }
    }

    return watermarkPositionArr
  }

  wariningLog(err) {
    console.warn(`[warning] : AutoWatermark, ${err}`)
  }

  errorLog(err) {
    console.error(`[ERROR] : AutoWatermark, ${err}`)
  }
}