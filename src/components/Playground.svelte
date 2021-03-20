<script context="module">
  import * as constants from '../types/constants.js'
  import {
    uiState,
    emojiFeedback,
    animations,
    currentAnimationId,
  } from '../stores.js'
  import Feedback from './Feedback.svelte'
  import Geometry from './Geometry.svelte'
  import AnimationsMenu from './AnimationsMenu.svelte'
  import Controls from './Controls.svelte'
</script>

<script>
  import * as utils from '../libs/utils.js'
  // Canvas
  let canvas
  let canvasWidth = 300
  let canvasHeight = 150
  let animationFrame

  // Audio
  let drumroll

  const defaultGeometry = {
    color: [Math.random(), Math.random(), Math.random(), 1],
    translation: [canvasWidth / 2, canvasHeight / 2],
    rotation: [0, 0],
    scale: [1, 1],
    width: utils.round((canvasWidth * 0.3) / 5, 2), // of geometry
    height: utils.round(canvasHeight / 5, 2), // of geometry
  }
  // TODO : fix - gepometry state is not reactive
  let geometry = defaultGeometry

  // animations
  let animationStartTime

  // UI feedback
  let playgroundState
  let emojiFrame
  let emojis
  let stacktrace = ''
  let animationId = $currentAnimationId
  let animation = $animations.find((animation) => animation.id === animationId)

  uiState.subscribe((value) => {
    playgroundState = value
  })
  emojiFeedback.subscribe((value) => {
    emojis = utils.multiply(Object.values(value))
  })
  currentAnimationId.subscribe((value) => {
    animationId = value
  })

  function loopEmojis() {
    emojiFrame = requestAnimationFrame(loopEmojis)

    emojis = emojis.map((emoji) => {
      if (!emoji.character) {
        emoji.character = '💩 undefined'
      }
      emoji.class = 'emoji'
      emoji.y += 0.7 * emoji.ratio
      if (emoji.y > 100) emoji.y = -20
      return emoji
    })
  }

  function clearEmojis() {
    cancelAnimationFrame(emojiFrame)
    emojis = []
  }

  function resetAudio() {
    drumroll.pause()
    drumroll.currentTime = 0
  }

  function runLoop(timestamp, duration) {
    const runtime = timestamp - animationStartTime
    if (duration && runtime >= duration) {
      celebrate()
    } else {
      // if duration not met yet
      if (animation.interactive) {
        animation.run(canvas, geometry)
      } else {
        animation.run(canvas)
      }
      animationFrame = requestAnimationFrame(function (t) {
        // call requestAnimationFrame again with parameters
        runLoop(t, duration)
      })
    }
  }

  function animate() {
    uiState.set(constants.uiState.ACTIVE)
    if (animation.audio) {
      drumroll.play()
    }
    animationFrame = requestAnimationFrame(function (timestamp) {
      animationStartTime = timestamp || new Date().getTime()
      let { duration, playbackRate } = animation
      if (playbackRate) {
        runLoop(timestamp, duration / playbackRate)
      }
      runLoop(timestamp, duration)
    })
  }

  function celebrate() {
    cancelAnimationFrame(animationFrame)
    clearEmojis()
    uiState.set(constants.uiState.SUCCESS)
    loopEmojis()
  }

  function stop() {
    cancelAnimationFrame(animationFrame)
    animation.clear()
    clearEmojis()
    uiState.set(constants.uiState.DEFAULT)
    resetAudio()
  }

  function handleError(error) {
    uiState.set(constants.uiState.ERROR)
    stacktrace = `${error}\n${stacktrace}`
    loopEmojis()
  }

  function play() {
    stop()
    try {
      animation = $animations.find((animation) => animation.id === animationId)
      animate()
    } catch (error) {
      handleError(error)
    }
  }

  function refresh() {
    stop()
    location.reload() // TODO - reload gl code only ?
  }

  function loadAnimation(event) {
    stop()
    currentAnimationId.set(event.detail.animationId)
    play()
  }

  function updateGeometry(event) {
    geometry = { ...geometry, ...event.detail.value }
    if (animation.interactive && animation.webGlProps) {
      animation.update(geometry)
    } else {
      play()
    }
  }
</script>

<div class="sidebar">
  <AnimationsMenu on:input={loadAnimation} />
  <Controls {play} {stop} {refresh} />
  {#if animation.interactive}
    <Geometry
      on:input={updateGeometry}
      geometry={defaultGeometry}
      {canvasWidth}
      {canvasHeight}
      {animation}
    />
  {/if}
</div>

<main
  data-cy="output"
  class={`output ${playgroundState}`}
  bind:offsetWidth={canvasWidth}
  bind:offsetHeight={canvasHeight}
>
  <canvas bind:this={canvas} data-cy="canvas" />
  <Feedback {stacktrace} />
  <audio
    data-cy="drumroll"
    bind:this={drumroll}
    duration={animation.duration}
    playbackRate={animation.playbackRate}
  >
    <source src="drumroll.ogg" type="audio/ogg" />
    <track kind="captions" srclang="en" />
    <!-- TODO: fix caption src -->
  </audio>

  {#each emojis as emoji}
    <span
      data-cy="emoji-{emoji.character}"
      class={emoji.class}
      style="left: {emoji.x}%; top: {emoji.y}%; transform: scale({emoji.ratio})"
    >
      {emoji.character}
    </span>
  {/each}
</main>

<style>
  main {
    height: 100%;
    max-height: 100%;
    width: 100%;
  }
  canvas {
    display: block;
    height: 100%;
    width: 100%;
  }
  .hidden {
    display: none;
  }
</style>
