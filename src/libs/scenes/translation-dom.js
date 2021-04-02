// @ts-check
/**
 ***********************
 * DRAW FUNCTIONS
 ***********************
 */

import * as utils from '../utils.js'
import * as utilsWebGl from '../utilsWebGL.js'

/**
 * @param {WebGLRenderingContext} gl
 * @param {Array} coords
 */
function setGeometry(gl, coords) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW)
}

/**
 * Write data to draw a rectangle into the last thing bound to gl.ARRAY_BUFFER (in this context positionBuffer)
 * @param {WebGLRenderingContext} gl
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @param {number} width
 * @param {number} height
 */
function setRectangle(gl, x, y, width, height) {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y + height
  // prettier-ignore
  const coords = [
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
   ]
  setGeometry(gl, coords)
}

/**
 * TRANSLATIONS
 * @param {WebGLRenderingContext} gl
 */
function renderTranslationRectangle(
  gl,
  colorUniformLocation,
  translation,
  color,
  width,
  height,
) {
  gl.uniform4fv(colorUniformLocation, color)
  setRectangle(gl, translation[0], translation[1], width, height)

  // Draw the rectangle.
  const primitiveType = gl.TRIANGLES
  const offset = 0
  const count = 6
  gl.drawArrays(primitiveType, offset, count)
}

/**
 * INITIALIZATION CODE
 * Code that gets executed once before the program runs
 * @param {HTMLCanvasElement} canvas
 */
export function initScene(canvas, vert, frag) {
  // 1. Get A WebGL context
  const gl = canvas.getContext('webgl')

  if (!gl) {
    alert("Sorry buddy, can't find WebGL in your browser ")
  }

  // 2. Initialize shaders : 2 programs that are executed each time a pixel is rendered
  // - Vertex Shader = returns pixel position
  // - Fragment Shader = returns pixel color
  const vertexShaderSrc = vert
  const fragmentShaderSrc = frag

  const vertexShader = utilsWebGl.createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSrc,
  )
  const fragmentShader = utilsWebGl.createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSrc,
  )
  // 3. Create WebGL program w and tell WebGL to use our shaders
  const program = utilsWebGl.createProgram(gl, vertexShader, fragmentShader)
  gl.useProgram(program)

  // 4. Bind resources / data

  // where the vertex data needs to go
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

  // 5. Set up Uniforms (~ globals)
  //  - sets uniforms to be bound to the current program
  // bind u_color
  const colorUniformLocation = gl.getUniformLocation(program, 'u_color')
  // bind u_translation
  const translationUniformLocation = gl.getUniformLocation(
    program,
    'u_translation',
  )
  // bind u_resolution
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    'u_resolution',
  )
  // bind u_rotation
  const rotationUniformLocation = gl.getUniformLocation(program, 'u_rotation')
  // bind u_scale
  const scaleUniformLocation = gl.getUniformLocation(program, 'u_scale')

  // Create a buffer to put positions in
  const positionBuffer = gl.createBuffer()

  // bind our resource (the positions buffer) to a BIND_POINT on the GPU
  // so that we can pass data to it
  // always set this up before rendering loop
  // (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  return {
    gl,
    resolutionUniformLocation,
    colorUniformLocation,
    translationUniformLocation,
    positionAttributeLocation,
    rotationUniformLocation,
    scaleUniformLocation,
    positionBuffer,
  }
}

/* **
  * @param  {
     gl,
     resolutionUniformLocation,
     positionAttributeLocation,
     positionBuffer,
   } webGlProps
  */
export function drawScene(webGlProps) {
  const {
    gl,
    resolutionUniformLocation,
    positionAttributeLocation,
    positionBuffer,
  } = webGlProps
  /************************
   * RENDERING CODE
   * Code that gets executed every time we draw
   ************************/
  const canvas = /** @type {HTMLCanvasElement} */ (gl.canvas)
  // 1. Setup canvas
  // - resize canvas to fit screen display
  utils.resize(canvas)
  // - tell WebGL how to covert clip space values for gl_Position back into screen space (pixels)
  // -> use gl.viewport
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

  // Clear the canvas
  gl.clearColor(0.0, 0.0, 0.0, 1.0) // set color to use as default when clearing buffer
  gl.clear(gl.COLOR_BUFFER_BIT)

  // 2. Bind Position
  // - Enable data supply into vertex shader a_position attribute
  gl.enableVertexAttribArray(positionAttributeLocation)
  // - Bind data retrieval to position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  /**
   *  Tell the a_position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
   * - vec4 a_position is a 4 float vector. We only need 2 values for 2D (points x,y)
   * - default values are:  0, 0, 0, 1
   * - we will set the first two (x, y), and the remaining two (z, w) will remain with default values (0,1)
   */
  const size = 2 // 2 components per iteration
  const type = gl.FLOAT // the data is in 32bit floats
  const normalize = false // don't normalize the data
  const stride = 0 // 0: move forward (size * sizeof(type)) each iteration to get to the next position
  const offset = 0 // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  )
}

export function translationScene(
  webGlProps,
  translation,
  color,
  width,
  height,
) {
  const {gl, colorUniformLocation} = webGlProps
  drawScene(webGlProps)
  // 3. Draw!!
  // - Draw 3 random rectangles
  renderTranslationRectangle(
    gl,
    colorUniformLocation,
    translation,
    color,
    width,
    height,
  )
}

export function render() {}
