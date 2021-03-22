<script context="module">
  import { getGeometryDefaults } from '../libs/animations.js'
  import {
    uiState,
    emojiFeedback,
    animations,
    currentAnimationId,
    currentCursor,
  } from '../stores.js'
  import Feedback from './Feedback.svelte'
  import Geometry from './Geometry.svelte'
  import AnimationsMenu from './AnimationsMenu.svelte'
  import Controls from './Controls.svelte'
</script>

<script>
  import * as constants from '../types/constants.js'
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
  let animation
  let customCursor

  let showContextMenu = false

  $: contextMenuStyle = showContextMenu ? 'contextMenu' : 'hidden'
  $: animation = $animations.find((animation) => animation.id === animationId)
  $: canvasStyle =
    playgroundState === constants.uiState.ACTIVE ? 'canvas' : 'hidden'

  uiState.subscribe((value) => {
    playgroundState = value
  })

  emojiFeedback.subscribe((value) => {
    emojis = utils.multiply(Object.values(value))
  })

  currentCursor.subscribe((value) => {
    if (value && value !== customCursor) {
      customCursor = value
    }
  })

  currentAnimationId.subscribe((value) => {
    animationId = value
  })

  function feedbackLoop() {
    emojiFrame = requestAnimationFrame(feedbackLoop)

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
      uiState.set(constants.uiState.SUCCESS)
      feedbackLoop()
    } else {
      // if duration not met yet
      try {
        if (animation.interactive) {
          if (animation.webGlProps) {
            animation.update(geometry)
          } else {
            animation.run(canvas, geometry)
          }
        } else {
          animation.run(canvas)
        }
        animationFrame = requestAnimationFrame(function (t) {
          // call requestAnimationFrame again with parameters
          runLoop(t, duration)
        })
      } catch (error) {
        handleError(error)
      }
    }
  }

  function play() {
    stop()
    uiState.set(constants.uiState.ACTIVE)
    if (animation.audio) {
      drumroll.play()
    }
    if (animation.interactive) {
      toggleContextMenu(true)
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

  function clearCanvas() {
    if (animation.interactive && animation.webGlProps) {
      geometry = getGeometryDefaults(canvasWidth, canvasHeight)
      animation.update(geometry)
    }
    cancelAnimationFrame(animationFrame)
    animation.clear()
  }

  function stop() {
    toggleContextMenu(false)
    clearCanvas()
    clearEmojis()
    resetAudio()
    uiState.set(constants.uiState.DEFAULT)
  }

  function handleError(error) {
    uiState.set(constants.uiState.ERROR)
    stacktrace = `${error}\n${stacktrace}`
    feedbackLoop()
  }

  function toggleContextMenu(value = null) {
    showContextMenu = value === null ? !showContextMenu : value
  }

  function loadAnimation(event) {
    stop()
    currentAnimationId.set(event.detail.animationId)
    animation = $animations.find((animation) => animation.id === animationId)
    play()
  }

  function updateGeometry(event) {
    geometry = { ...geometry, ...event.detail.value }
  }
</script>

<header>
  <AnimationsMenu on:input={loadAnimation} />
</header>
<main style={`cursor: ${customCursor}`}>
  <div
    data-cy="output"
    class={`output ${playgroundState}`}
    bind:offsetWidth={canvasWidth}
    bind:offsetHeight={canvasHeight}
  >
    <canvas class={canvasStyle} bind:this={canvas} data-cy="canvas" />
    <Feedback {stacktrace} />
  </div>
  <Controls
    {play}
    {stop}
    {toggleContextMenu}
    bind:showHandles={animation.interactive}
  />
  <aside class={contextMenuStyle}>
    {#if animation.interactive}
      <Geometry on:update={updateGeometry} {canvasWidth} {canvasHeight} />
    {/if}
  </aside>
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

<style lang="scss">
  main {
    height: calc(
      100% - 84px
    ); // 100% - header height, TODO : fix header, set height in vars
    width: 100%;
  }
  .hidden {
    display: none;
  }

  /* .emoji {
    position: relative;
  } */

  .output {
    position: relative;
    width: calc(100% - 1em);
    padding-top: 100%;
    overflow-y: scroll;
    margin: 0.5em 0;
  }
  .output.error {
    padding-top: 0;
    max-height: calc(100% - 320px);
  }
  .canvas {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
  }
  .hidden {
    display: none;
  }

  @media (min-aspect-ratio: 1/1.35) {
    .output {
      padding-top: 0;
      width: calc(100vh - 100px);
      height: calc(100vh - 100px);
    }
  }
  @media (min-aspect-ratio: 1/1.21) {
    .output {
<<<<<<< HEAD
      width: calc(100% - 300px);
      padding-top: calc(100% - 300px);
=======
      width: calc(100vh - 200px);
      height: calc(100vh - 200px);
    }
    .contextMenu {
      position: absolute;
      bottom: 0;
      right: 0;
>>>>>>> da621c8... 💄 Button styles
    }
  }
</style>
