<script>
  import {onMount} from 'svelte'
  import * as draw from '../libs/draw.js'

  let maxX
  let maxY

  let canvas
  const height = 400
  const width = 400
  let coordX = 0
  let coordY = 0
  let translation
  const rectWidth = 100
  const rectHeight = 30

  $: translation = [coordX, coordY]
  $: maxX = width - rectWidth
  $: maxY = height - rectHeight

  let webGlProps

  function run(canvas, translation) {
    webGlProps = draw.initScene(canvas)
    draw.drawTranslationScene(webGlProps, translation)
  }

  function update() {
    draw.drawTranslation(webGlProps, translation)
  }

  onMount(() => {
    run(canvas, translation)
  })
</script>

<label>
  x =
  {coordX}
  <input type="range" bind:value={coordX} max={maxX} on:input={update} />
</label>
<label>
  y =
  {coordY}
  <input type="range" bind:value={coordY} max={maxY} on:input={update} />
</label>

<canvas bind:this={canvas} {width} {height} />

<style>
  canvas {
    background-color: black;
    margin-top: 1em;
  }
  label {
    display: block;
    width: 400px;
  }
  input {
    display: block;
    width: 400px;
  }
</style>
