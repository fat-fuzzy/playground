import * as draw from '../libs/draw.js'
import * as utils from '../libs/utils.js'

import {frag} from '../gl/fragment-shader-2d'
import {vert} from '../gl/vertex-shader-2d'
import {vert as vert2d} from '../gl/vertex-shader-scale-2d'

export const animations = [
  {
    id: 'random-rect',
    name: '🎰 Random',
    duration: 2000,
    vert,
    frag,
    init(canvas) {
      this.webGlProps = draw.initScene(canvas, this.vert, this.frag)
    },
    run(canvas) {
      if (!this.webGlProps) {
        this.init(canvas)
      }
      draw.rectanglesScene(this.webGlProps)
    },
    clear() {
      this.webGlProps = null
    },
  },
  {
    id: 'random-rect-audio',
    name: '🥁 Audio',
    audio: true,
    duration: 4179,
    playbackRate: 2,
    vert,
    frag,
    init(canvas) {
      this.webGlProps = draw.initScene(canvas, this.vert, this.frag)
    },
    run(canvas) {
      if (!this.webGlProps) {
        this.init(canvas)
      }
      draw.rectanglesScene(this.webGlProps)
    },
    clear() {
      this.webGlProps = null
    },
  },
  {
    id: '2D-geometry',
    name: '📐 2D',
    interactive: true,
    webGlProps: null,
    vert: vert2d,
    frag,
    color: null,
    init(canvas) {
      this.webGlProps = draw.initScene(canvas, this.vert, this.frag)
    },
    run(canvas, geometry) {
      if (!this.webGlProps) {
        this.init(canvas)
      }
      const {color, translation, rotation, scale } = geometry
      this.color = color
      const drawOptions = {
        webGlProps: this.webGlProps,
        translation,
        rotation,
        scale,
        color,
      }
      draw.translationSceneViaWebGL(drawOptions)
    },
    update(geometry) {
      const {translation, rotation, scale} = geometry
      const drawOptions = {
        webGlProps: this.webGlProps,
        translation,
        rotation,
        scale,
        color: this.color,
      }
      draw.drawSceneT2DGL(drawOptions)
    },
    clear() {
      this.webGlProps = null
    },
  },
  {
    id: 'test-poop',
    name: '💩 Not a bug',
    type: 'test',
    run() {
      throw Error('Test 💩')
    },
    clear() {
      // do nothing
    }
  },
]

export function getGeometryDefaults(canvasWidth, canvasHeight) {
  return {
    color: [Math.random(), Math.random(), Math.random(), 1],
    translation: [canvasWidth / 2, canvasHeight / 2],
    rotation: [0, 0],
    scale: [1, 1],
    width: utils.round((canvasWidth * 0.3) / 5, 2), // of geometry
    height: utils.round(canvasHeight / 5, 2), // of geometry
  }
}