<script context="module">
  import {getGeometryDefaults} from '../libs/animations.js'
  import {
    uiState,
    emojiFeedback,
    animations,
    currentAnimationId,
    currentCursor,
  } from '../stores.js'
  import Feedback from './Feedback.svelte'
  import Geometry from './Geometry.svelte'
  import Menu from './Menu.svelte'
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

  let showSidebar = false

  $: animation = $animations.find((animation) => animation.id === animationId)
  $: sidebarClass = showSidebar ? 'sidebar' : 'hidden'
  $: canvasClass =
    playgroundState === constants.uiState.ACTIVE ? 'canvas' : 'hidden'
  $: outputClass = `output ${playgroundState}`

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
      toggleSidebar(true)
    }
    animationFrame = requestAnimationFrame(function (timestamp) {
      animationStartTime = timestamp || new Date().getTime()
      let {duration, playbackRate} = animation
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
    toggleSidebar(false)
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

  function toggleSidebar(value = null) {
    showSidebar = value === null ? !showSidebar : value
  }

  function loadAnimation(event) {
    stop()
    currentAnimationId.set(event.detail.animationId)
    animation = $animations.find((animation) => animation.id === animationId)
    play()
  }

  function updateGeometry(event) {
    geometry = {...geometry, ...event.detail.value}
  }
</script>

<Menu on:input={loadAnimation} />
<main style={`cursor: ${customCursor}`}>
  <div
    data-cy="output"
    class={outputClass}
    bind:offsetWidth={canvasWidth}
    bind:offsetHeight={canvasHeight}
  >
    <canvas data-cy="canvas" class={canvasClass} bind:this={canvas} />
    <Feedback {stacktrace} />
  </div>
  <div class={sidebarClass}>
    {#if animation.interactive}
      <Geometry on:update={updateGeometry} {canvasWidth} {canvasHeight} />
    {/if}
  </div>
  <Controls
    {play}
    {stop}
    {toggleSidebar}
    bind:showHandles={animation.interactive}
  />
  <audio
    data-cy="drumroll"
    duration={animation.duration}
    playbackRate={animation.playbackRate}
    bind:this={drumroll}
  >
    <source src="drumroll.ogg" type="audio/ogg" />
    <track kind="captions" srclang="en" />
    <!-- TODO: fix caption src -->
  </audio>
</main>

{#each emojis as emoji}
  <span
    data-cy="emoji-{emoji.character}"
    class={emoji.class}
    style="left: {emoji.x}%; top: {emoji.y}%; transform: scale({emoji.ratio})"
  >
    {emoji.character}
  </span>
{/each}

<style lang="scss">
  @import '../styles/components/playground.scss';
</style>
