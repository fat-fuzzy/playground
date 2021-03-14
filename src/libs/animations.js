import * as draw from '../libs/draw.js'

import {frag} from '../gl/fragment-shader-2d'
import {vert} from '../gl/vertex-shader-2d'
import {vert as vert2d} from '../gl/vertex-shader-scale-2d'

export const animations = [
  {
    id: 'random-rect',
    name: 'Random rectangles',
    loop: true,
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
    name: '... with drums',
    loop: true,
    audio: true,
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
    name: '2D geometry',
    ui: ['position', 'angle', 'scale'],
    position: true,
    rotation: true,
    scale: true,
    webGlProps: null,
    vert: vert2d,
    frag,
    color: null,
    run(canvas, translation, rotation, scale, color) {
      this.color = color
      this.webGlProps = draw.initScene(canvas, this.vert, this.frag)
      const drawOptions = {
        webGlProps: this.webGlProps,
        translation,
        rotation,
        scale,
        color,
      }
      draw.translationSceneViaWebGL(drawOptions)
    },
    update(translation, rotation, scale) {
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
]
