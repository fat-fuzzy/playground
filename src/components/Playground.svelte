<script context="module">
  import { onMount } from 'svelte'
  import * as constants from '../types/constants.js'
  import { getGeometryDefaults } from '../libs/animations.js'
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
  // TODO : fix - gepometry state is not reactive
  let geometry = getGeometryDefaults(canvasWidth, canvasHeight)

  // animations
  let animationStartTime

  // UI feedback
  let playgroundState
  let emojiFrame
  let emojis = []
  let stacktrace = ''
  let animationId = $currentAnimationId
  let animation = $animations.find((animation) => animation.id === animationId)

  let showSidebar = false

  $: sidebarClass = showSidebar ? 'sidebar' : 'hidden'

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
    try {
      animation = $animations.find((animation) => animation.id === animationId)
      if (animation.interactive && animation.webGlProps) {
        animation.update(geometry)
      } else {
        animate()
      }
    } catch (error) {
      handleError(error)
    }
  }

  function refresh() {
    stop()
    location.reload() // TODO - reload gl code only ?
  }
  function toggleHandles() {
    showSidebar = !showSidebar
  }

  function loadAnimation(event) {
    stop()
    currentAnimationId.set(event.detail.animationId)
    play()
  }

  function updateGeometry(event) {
    geometry = event.detail.value
  }
</script>

<header>
  <AnimationsMenu on:input={loadAnimation} />
</header>
<main>
  <div
    data-cy="output"
    class={`output ${playgroundState}`}
    bind:offsetWidth={canvasWidth}
    bind:offsetHeight={canvasHeight}
  >
    <canvas bind:this={canvas} data-cy="canvas" />
    <Feedback {stacktrace} />
  </div>
  <Controls {play} {stop} {refresh} {toggleHandles} />
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
<aside class={sidebarClass}>
  {#if animation.interactive}
    <Geometry
      on:update={updateGeometry}
      {canvasWidth}
      {canvasHeight}
      {animation}
    />
  {/if}
</aside>

<style>
  main {
    position: relative;
    height: 100%;
    max-height: 100%;
    width: 100%;
  }
  .hidden {
    display: none;
  }

  .emoji {
    position: relative;
  }

  .output {
    position: relative;
    width: 100%;
    padding-top: calc(100% - 160px); /* will change */
  }
  canvas {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
  }
  .sidebar {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
