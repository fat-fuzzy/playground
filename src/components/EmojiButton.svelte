<script>
  import { onMount } from 'svelte'

  import { uiState } from '../stores.js'

  // Inputs
  let emojiButton
  export let buttonLabel
  export let buttonClass
  export let dataCy
  export let disabled

  // UI feedback
  let playgroundState

  // Event Handlers
  export let handleClick = () => {}
  export let handleFocus = () => {}
  export let handleBlur = () => {}
  const uiStateUnsub = uiState.subscribe((value) => {
    playgroundState = value
  })

  onMount(() => {
    return () => {
      uiStateUnsub()
    }
  })
</script>

<button
  data-cy={dataCy}
  on:focus={handleFocus}
  on:mouseover={handleFocus}
  on:mouseleave={handleBlur}
  on:click={handleClick}
  class={`btn-emoji ${buttonClass} ${playgroundState}`}
  aria-label={buttonLabel}
  {disabled}
>
  {buttonLabel}
</button>

<style lang="scss">
  // @import '../styles/variables.scss';
  // @import '../styles/components/buttons.scss';
</style>
