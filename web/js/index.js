import '../style.css'
import '../css/index.less'
import p from '../2.png'
import AutoWatermark from './auto-bright-watermark.js'

new AutoWatermark({
  rotate: -25,
  contentSize: {
    width: 200,
    height: 100
  }
})

new AutoWatermark({
  repeat: false,
  rotate: -5,
  dataWater: 'water1',
  contentSize: {
    width: 500,
    height: 180
  }
})

new AutoWatermark({
  rotate: -25,
  contentImg: p,
  contentSize: {
    width: 170,
    height: 100
  },
  dataWater: 'water2'
})

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

