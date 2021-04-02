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
 * TRANSLATIONS
 * @param {WebGLRenderingContext} gl
 */
function renderTranslationGeometry(gl, colorUniformLocation, color) {
  // TODO here: extract values from coordinates (width + height)
  /* prettier-ignore */
  const coords = [
    // left column
    0, 0,
    30, 0,
    0, 150,
    0, 150,
    30, 0,
    30, 150,

    // top rung
    30, 0,
    100, 0,
    30, 30,
    30, 30,
    100, 0,
    100, 30,

    // middle rung
    30, 60,
    67, 60,
    30, 90,
    30, 90,
    67, 60,
    67, 90,
  ]
  gl.uniform4fv(colorUniformLocation, color)
  setGeometry(gl, coords)

  // Draw the rectangle.
  const primitiveType = gl.TRIANGLES
  const offset = 0
  const count = 18
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

// Draw the scene.
export function drawScene(options) {
  const {webGlProps, translation, rotation, scale, color} = options
  const {
    gl,
    resolutionUniformLocation,
    colorUniformLocation,
    translationUniformLocation,
    positionAttributeLocation,
    rotationUniformLocation,
    scaleUniformLocation,
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

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  // Clear the canvas.
  gl.clearColor(0.0, 0.0, 0.0, 1.0) // set color to use as default when clearing buffer
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation)

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2 // 2 components per iteration
  const type = gl.FLOAT // the data is 32bit floats
  const normalize = false // don't normalize the data
  const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
  let offset = 0 // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset,
  )
  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

  // set the color
  gl.uniform4fv(colorUniformLocation, color)

  // Set the translation.
  gl.uniform2fv(translationUniformLocation, translation)

  // Set the rotation.
  gl.uniform2fv(rotationUniformLocation, rotation)

  // Set the scale.
  gl.uniform2fv(scaleUniformLocation, scale)

  // Draw the geometry.
  const primitiveType = gl.TRIANGLES
  offset = 0
  const count = 18 // 6 triangles in the 'F', 3 points per triangle
  gl.drawArrays(primitiveType, offset, count)
}

export function translationScene(options) {
  const {webGlProps, color} = options
  const {gl, colorUniformLocation} = webGlProps
  renderTranslationGeometry(gl, colorUniformLocation, color) // Set the translation.
  drawScene(options)
}

export function render() {}
