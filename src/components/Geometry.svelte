<script context="module">
  import { onMount, createEventDispatcher } from 'svelte'
  import * as constants from '../types/constants.js'
  import { getGeometryDefaults } from '../libs/animations.js'
  import { uiState } from '../stores.js'
  import Position from './Position.svelte'
  import Scale from './Scale.svelte'
  import Rotation from './Rotation.svelte'
</script>

<script>
  import * as utils from '../libs/utils.js'
  // @ts-check
  export let canvasWidth
  export let canvasHeight
  export let geometry

  const dispatch = createEventDispatcher()

  let { color, translation, rotation, scale } = getGeometryDefaults(
    canvasWidth,
    canvasHeight,
  )
  // input attributes
  let maxX
  let maxY
  let angle

  // Shape
  let width
  let height

  // Position
  let coordX
  let coordY

  // Rotation
  let radCoordX
  let radCoordY

  // Scale
  let scaleX
  let scaleY

  function init() {
    geometry = getGeometryDefaults(canvasWidth, canvasHeight)
    // Shape
    color = geometry.color
    width = geometry.width
    height = geometry.height

    // Position
    ;[coordX, coordY] = geometry.translation

    // Rotation
    ;[radCoordX, radCoordY] = geometry.rotation

    // Scale
    ;[scaleX, scaleY] = geometry.scale

    // input attributes
    maxX = canvasWidth - width
    maxY = canvasHeight - height
    angle = 0
  }

  $: maxX = canvasWidth - width
  $: maxY = canvasHeight - canvasHeight
  $: radCoordX = Math.cos(utils.degToRad(angle))
  $: radCoordY = Math.sin(utils.degToRad(angle))
  $: translation = [coordX, coordY]
  $: rotation = [radCoordX, radCoordY]
  $: scale = [scaleX, scaleY]
  $: geometry = {
    color,
    translation,
    rotation,
    scale,
    width,
    height,
  }

  const update = () =>
    dispatch('update', {
      value: geometry,
    })

  onMount(() => {
    init()
  })
</script>

<form>
  <Position bind:coordX bind:coordY bind:maxX bind:maxY on:input={update} />
  <Scale
    bind:scaleX
    bind:scaleY
    maxX="5"
    maxY="5"
    minX="-5"
    minY="-5"
    on:input={update}
  />
  <Rotation bind:angle max={360} on:input={update} />
</form>

<style lang="scss">
  form {
    display: flex;
    grid-column-start: 2;
    grid-row-end: 3;
    grid-row-start: 1;
    height: auto;
    justify-content: flex-start;
    overflow-y: auto;
    width: 100%;
  }

  @media (min-aspect-ratio: 1/1) {
    form {
      flex-direction: column;
      grid-column-start: 1;
      grid-row-start: 2;
      margin-left: 0;
    }
  }
</style>
