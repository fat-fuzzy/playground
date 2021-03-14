<script context="module">
  import * as constants from '../types/constants.js'
  import {
    uiState,
    emojiFeedback,
    animations,
    currentAnimationId,
  } from '../stores.js'
  import Feedback from './Feedback.svelte'
  import GeometryControls from './GeometryControls.svelte'
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
  let playbackRate = 2

  // WebGL Geometry
  const width = 100 // of geometry
  const height = 30 // of geometry

  const geometryStateDefault = {
    color: [Math.random(), Math.random(), Math.random(), 1],
    translation: [canvasWidth / 2, canvasHeight / 2],
    rotation: [0, 0],
    scale: [1, 1],
  }
  // TODO : fix - gepometry state is not reactive
  let geometryState = geometryStateDefault

  // animations
  let animationStartTime
  const animationDuration = 4179 / playbackRate

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
      if (animation.position) {
        animation.run(
          canvas,
          geometryState.translation,
          geometryState.rotation,
          geometryState.scale,
          geometryState.color,
          width,
          height,
        )
      } else {
        animation.run(canvas)
      }
      animationFrame = requestAnimationFrame(function (t) {
        // call requestAnimationFrame again with parameters
        runLoop(t, duration)
      })
    }
  }

  function animate(duration) {
    uiState.set(constants.uiState.ACTIVE)
    if (animation.audio) {
      drumroll.play()
    }
    animationFrame = requestAnimationFrame(function (timestamp) {
      animationStartTime = timestamp || new Date().getTime()
      runLoop(timestamp, duration)
    })
  }

  function celebrate() {
    cancelAnimationFrame(animationFrame)
    clearEmojis()
    uiState.set(constants.uiState.SUCCESS)
    loopEmojis()
  }

  function resetPlayground() {
    uiState.set(constants.uiState.DEFAULT)
    resetAudio()
    cancelAnimationFrame(animationFrame)
    animation.clear()
    clearEmojis()
  }

  function handleError(error) {
    uiState.set(constants.uiState.ERROR)
    stacktrace = `${error}\n${stacktrace}`
    loopEmojis()
  }

  function play() {
    resetPlayground()
    try {
      if (animation.loop) {
        animate(animationDuration)
      } else {
        animate()
      }
    } catch (error) {
      handleError(error)
    }
  }

  function refresh() {
    resetPlayground()
    location.reload() // TODO - reload gl code only ?
  }

  function stop() {
    resetPlayground()
  }

  function handleLoadAnimation(event) {
    resetPlayground()
    currentAnimationId.set(event.detail.animationId)
    animation = $animations.find((animation) => animation.id === animationId)
    play()
  }

  function updateGeometry(event) {
    const {color, translation, rotation, scale} = event.detail.value
    geometryState = {...geometryState, color, translation, rotation, scale}
    if (animation.position && animation.webGlProps) {
      animation.update(translation, rotation, scale)
    } else {
      play()
    }
  }
</script>

<section
  data-cy="output"
  class={`output ${playgroundState}`}
  bind:offsetWidth={canvasWidth}
  bind:offsetHeight={canvasHeight}
>
  <canvas bind:this={canvas} data-cy="canvas" />
  <Feedback {stacktrace} />
  <audio
    data-cy="drumroll"
    duration={animationDuration}
    bind:this={drumroll}
    bind:playbackRate
  >
    <source src="drumroll.ogg" type="audio/ogg" />
    <track kind="captions" srclang="en" />
    <!-- TODO: fix caption src -->
  </audio>
</section>

<aside class="sidebar">
  <AnimationsMenu on:loadAnimation={handleLoadAnimation} />
  <GeometryControls
    on:change={updateGeometry}
    defaultState={geometryStateDefault}
    {geometryState}
    {canvasWidth}
    {canvasHeight}
    {animation}
  />
  <Controls {play} {stop} {refresh} />
</aside>
{#each emojis as emoji}
  <span
    data-cy="emoji-{emoji.character}"
    class="emoji"
    style="left: {emoji.x}%; top: {emoji.y}%; transform: scale({emoji.ratio})"
  >
    {emoji.character}
  </span>
{/each}

<style lang="scss">
  @import '../styles/playground.scss';
</style>
