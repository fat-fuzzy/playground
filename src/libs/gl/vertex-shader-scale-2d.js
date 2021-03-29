const vert = `
// an attribute will receive data from a buffer
// attribute vec4 a_position; vec4 not necessary for 2D
attribute vec2 a_position;
uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform vec2 u_rotation;
uniform vec2 u_scale;

// all shaders have a main function
void main() {
  // Scale the position
  vec2 scaledPosition = a_position * u_scale;
  
  // Rotate the position
  vec2 rotatedPosition = vec2(
    scaledPosition.x * u_rotation.y + scaledPosition.y * u_rotation.x,
    scaledPosition.y * u_rotation.y - scaledPosition.x * u_rotation.x
  );

  // Add in the translation
  vec2 position = rotatedPosition + u_translation;

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = zeroToTwo - 1.0;

  // gl_Position is a special variable in a vertex shader
  // it is responsible for setting
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1); // 0,0 = top, left (traditional 3D)
  // gl_Position = vec4(clipSpace, 0, 1); // 0,0 = bottom, left
}
`
export {vert}
