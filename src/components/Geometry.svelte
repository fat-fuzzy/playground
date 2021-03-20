<script context="module">
  import { onMount, createEventDispatcher } from 'svelte'
  import * as constants from '../types/constants.js'
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

  // input attributes
  let maxX
  let maxY
  let angle

  // Shape
  let color
  let width
  let height

  // Position
  let coordX
  let coordY
  let translation

  // Rotation
  let radCoordX
  let radCoordY
  let rotation

  // Scale
  let scaleX
  let scaleY
  let scale

  let playgroundState

  function init() {
    // Shape
    color = [Math.random(), Math.random(), Math.random(), 1]
    width = utils.round((canvasWidth * 0.3) / 5, 2) // of geometry
    height = utils.round(canvasHeight / 5, 2) // of geometry

    // Position
    coordX = canvasWidth / 2
    coordY = canvasHeight / 2
    translation = [coordX, coordY]

    // Rotation
    radCoordX = radCoordY = 0
    rotation = [radCoordX, radCoordY]

    // Scale
    scaleX = scaleY = 1
    scale = [scaleX, scaleY]

    // input attributes
    maxX = canvasWidth - width
    maxY = canvasHeight - height
    angle = 0
  }

  function sub() {
    uiState.subscribe((value) => {
      if (playgroundState !== value) {
        if (value === constants.uiState.DEFAULT) {
          init()
          update()
        }
        playgroundState = value
      }
    })
  }
  $: translation = [coordX, coordY]
  $: radCoordX = Math.cos(utils.degToRad(angle))
  $: radCoordY = Math.sin(utils.degToRad(angle))
  $: rotation = [radCoordX, radCoordY]
  $: scale = [scaleX, scaleY]
  $: maxX = canvasWidth - width
  $: maxY = canvasHeight - height
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
    sub()
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
