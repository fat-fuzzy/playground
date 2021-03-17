<script context="module">
  import * as constants from '../types/constants.js'
  import { uiState } from '../stores.js'
  import Position from './Position.svelte'
  import Scale from './Scale.svelte'
  import Rotation from './Rotation.svelte'

  import { createEventDispatcher } from 'svelte'
</script>

<script>
  import * as utils from '../libs/utils.js'
  // @ts-check
  export let geometryStateDefault
  export let geometryState = geometryStateDefault
  export let canvasWidth
  export let canvasHeight

  function round(n, decimals) {
    return Number(Math.round(n + 'e' + decimals) + 'e-' + decimals)
  }
  const dispatch = createEventDispatcher()
  /**
   * Geometry controls
   */
  // Position
  let maxX = canvasWidth
  let maxY = canvasHeight
  let coordX = canvasWidth / 2
  let coordY = canvasHeight / 2
  let translation = [coordX, coordY]

  // Color & Dimensions
  let color = [Math.random(), Math.random(), Math.random(), 1]
  const width = round((canvasWidth * 0.3) / 5, 2) // of geometry
  const height = round(canvasHeight / 5, 2) // of geometry

  // rotation
  let angle = 0
  let radCoordX = Math.cos(utils.degToRad(angle)) // radial coordinate x = cos(O)
  let radCoordY = Math.sin(utils.degToRad(angle)) // radial coordinate y = sin(O)
  let rotation = [radCoordX, radCoordY]

  // scale
  let scaleX = 1
  let scaleY = 1
  let scale = [scaleX, scaleY]

  $: translation = [coordX, coordY]
  $: radCoordX = Math.cos(utils.degToRad(angle)) // radial coordinate x = cos(O)
  $: radCoordY = Math.sin(utils.degToRad(angle)) // radial coordinate y = sin(O)
  $: rotation = [radCoordX, radCoordY]
  $: scale = [scaleX, scaleY]
  $: maxX = canvasWidth - width
  $: maxY = canvasHeight - height
  $: geometryState = {
    color,
    translation,
    rotation,
    scale,
  }

  let playgroundState
  uiState.subscribe((value) => {
    playgroundState = value
    if (playgroundState === constants.uiState.DEFAULT) {
      resetGeometry()
    }
  })

  function resetColor() {
    color = [Math.random(), Math.random(), Math.random(), 1]
  }

  function resetPosition() {
    coordX = maxX / 2
    coordY = maxY / 2
    angle = 0
  }

  function resetScale() {
    scaleX = 1
    scaleY = 1
  }

  function handleChange() {
    dispatch('input', {
      value: geometryState,
    })
  }

  function resetGeometry() {
    resetColor()
    resetPosition()
    resetScale()
    handleChange()
  }
</script>

<form>
  <Position
    bind:coordX
    bind:coordY
    bind:maxX
    bind:maxY
    on:input={handleChange}
  />
  <Scale
    bind:scaleX
    bind:scaleY
    maxX="5"
    maxY="5"
    minX="-5"
    minY="-5"
    on:input={handleChange}
  />
  <Rotation bind:angle max={360} on:input={handleChange} />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    grid-column-start: 2;
    grid-row-end: 3;
    grid-row-start: 1;
    height: auto;
    justify-content: flex-start;
    overflow-y: auto;
    width: 100%;
  }

  @media (min-width: 768px) and (min-aspect-ratio: 3/5) {
    form {
      grid-column-start: 1;
      grid-row-start: 2;
      margin-left: 0;
    }
  }
</style>
