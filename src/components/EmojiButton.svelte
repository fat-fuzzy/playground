<script>
  import {onMount} from 'svelte'

  import {uiState, currentCursor} from '../stores.js'

  // Inputs
  let emojiButton
  export let buttonLabel
  export let buttonClass
  export let dataCy

  // UI feedback
  let playgroundState
  let customCursor

  // Event Handlers
  export let handleClick = () => {}
  export let handleFocus = () => {}
  export let handleBlur = () => {}
  const uiStateUnsub = uiState.subscribe((value) => {
    playgroundState = value
  })

  const emojiFeedbackUnsub = currentCursor.subscribe((value) => {
    if (value && value !== customCursor) {
      customCursor = value
    }
  })
  onMount(() => {
    return () => {
      uiStateUnsub()
      emojiFeedbackUnsub()
    }
  })
</script>

<button
  data-cy={dataCy}
  on:focus={handleFocus}
  on:mouseover={handleFocus}
  on:mouseleave={handleBlur}
  on:click={handleClick}
  bind:this={emojiButton}
  class={`btn-emoji ${buttonClass} ${playgroundState}`}
  style={`cursor: ${customCursor}`}
  aria-label={buttonLabel}
/>

<style lang="scss">
  @import '../styles/buttons.scss';
</style>
