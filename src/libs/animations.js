import * as draw from './draw.js'
import * as utils from './utils.js'

import * as randomRect from './scenes/random-rect.js'
import * as geometry2d from './scenes/geometry-2d.js'
import * as translation from './scenes/translation-dom.js'

import {frag} from './gl/fragment-shader-2d'
import {vert} from './gl/vertex-shader-2d'
import {vert as vert2d} from './gl/vertex-shader-scale-2d'

export const animations = [
  {
    id: 'randomRect',
    slug: 'random-rect',
    name: 'Random',
    emoji: '🎰',
    duration: 2000,
    vert,
    frag,
    scene: randomRect,
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
    id: 'randomRectAudio',
    slug: 'random-rect-audio',
    name: 'Audio',
    emoji: '🥁',
    audio: true,
    duration: 4179,
    playbackRate: 2,
    vert,
    frag,
    scene: randomRect,
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
    id: 'geometry2d',
    slug: 'geometry-2d',
    name: '2D',
    emoji: '📐',
    interactive: true,
    webGlProps: null,
    vert: vert2d,
    frag,
    scene: geometry2d,
    color: null,
    init(canvas) {
      this.webGlProps = draw.initScene(canvas, this.vert, this.frag)
    },
    run(canvas, geometry) {
      if (!this.webGlProps) {
        this.init(canvas)
      }
      const {color, translation, rotation, scale} = geometry
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
    id: 'poop',
    slug: 'poop',
    name: 'A Feature',
    emoji: '💩',
    type: 'test',
    run() {
      throw Error('Not a Bug 💩')
    },
    clear() {
      // do nothing
    },
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
