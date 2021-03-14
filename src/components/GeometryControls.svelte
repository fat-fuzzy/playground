<script context="module">
  import * as constants from '../types/constants.js'
  import {uiState} from '../stores.js'
  import InputRange from './InputRange.svelte'
  import Position from './Position.svelte'
  import Scale from './Scale.svelte'

  import {createEventDispatcher} from 'svelte'
</script>

<script>
  import * as utils from '../libs/utils.js'
  // @ts-check
  export let geometryStateDefault
  export let geometryState = geometryStateDefault
  export let canvasWidth = 300
  export let canvasHeight = 150
  export let animation

  const dispatch = createEventDispatcher()
  /**
   * Geometry controls
   */

  // Color & Dimensions
  let color = [Math.random(), Math.random(), Math.random(), 1]
  const width = 100 // of geometry
  const height = 30 // of geometry

  // translation
  let maxX = canvasWidth
  let maxY = canvasHeight
  let xCoord = canvasWidth / 2
  let yCoord = canvasHeight / 2
  let translation = [xCoord, yCoord]
  let showPosition = false

  // rotation
  let angle = 0
  let xRadCoord = Math.cos(utils.degToRad(angle)) // radial coordinate x = cos(O)
  let yRadCoord = Math.sin(utils.degToRad(angle)) // radial coordinate y = sin(O)
  let rotation = [xRadCoord, yRadCoord]
  let showRotation = false

  // scale
  let xScale = 1
  let yScale = 1
  let scale = [xScale, yScale]
  let showScale = false

  $: showPosition = animation.position
  $: showRotation = animation.rotation
  $: showScale = animation.scale
  $: translation = [xCoord, yCoord]
  $: xRadCoord = Math.cos(utils.degToRad(angle)) // radial coordinate x = cos(O)
  $: yRadCoord = Math.sin(utils.degToRad(angle)) // radial coordinate y = sin(O)
  $: rotation = [xRadCoord, yRadCoord]
  $: scale = [xScale, yScale]
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
    xCoord = maxX / 2
    yCoord = maxY / 2
    angle = 0
  }

  function resetScale() {
    xScale = 1
    yScale = 1
  }

  function handleChange() {
    dispatch('change', {
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

<ul class="geometry-controls">
  {#if showPosition}
    <li data-cy="position">
      <Position
        bind:xCoord
        bind:yCoord
        bind:maxX
        bind:maxY
        on:input={handleChange}
      />
    </li>
  {/if}
  {#if showScale}
    <li>
      <Scale
        bind:xScale
        bind:yScale
        maxX="5"
        maxY="5"
        minX="-5"
        minY="-5"
        on:input={handleChange}
      />
    </li>
  {/if}
  {#if showRotation}
    <li>
      <InputRange
        bind:value={angle}
        label="angle"
        max={360}
        on:input={handleChange}
      />
    </li>
  {/if}
</ul>

<style lang="scss">
  @import '../styles/geometry-controls.scss';
</style>
