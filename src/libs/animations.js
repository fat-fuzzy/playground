import * as draw from '../libs/draw.js'

import {frag} from '../gl/fragment-shader-2d'
import {vert} from '../gl/vertex-shader-2d'
import {vert as vert2d} from '../gl/vertex-shader-scale-2d'

export const animations = [
  {
    id: 'random-rect',
    name: 'Random rectangles',
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
    name: '... with drums',
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
    name: '2D geometry',
    interactive: true,
    webGlProps: null,
    vert: vert2d,
    frag,
    color: null,
    run(canvas, geometry) {
      const {color, translation, rotation, scale } = geometry
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
]
