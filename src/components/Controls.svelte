<script>
  import {onMount} from 'svelte'

  import * as constants from '../types/constants.js'
  import {uiState} from '../stores.js'
  import EmojiButton from './EmojiButton.svelte'

  // UI feedback
  let playgroundState

  const uiStateUnsub = uiState.subscribe((value) => {
    playgroundState = value
  })

  export let play = () => {}
  export let stop = () => {}
  export let refresh = () => {}

  function handlePlayButtonFocus() {
    if (playgroundState === constants.uiState.DEFAULT) {
      uiState.set(constants.uiState.FOCUS)
    }
  }

  function handlePlayButtonBlur() {
    if (playgroundState === constants.uiState.FOCUS) {
      uiState.set(constants.uiState.DEFAULT)
    }
  }

  onMount(() => {
    return () => {
      uiStateUnsub()
    }
  })
</script>

<div class="btn-group ui-controls">
  <EmojiButton
    dataCy="btn-play"
    buttonClass="firestarter"
    buttonLabel="Play"
    handleClick={play}
    handleFocus={handlePlayButtonFocus}
    handleBlur={handlePlayButtonBlur}
  />
  <EmojiButton
    dataCy="btn-reset"
    buttonClass="sponge"
    buttonLabel="Reset playground"
    handleClick={stop}
  />
  <EmojiButton
    dataCy="btn-refresh"
    buttonClass="shower"
    buttonLabel="Refresh page"
    handleClick={refresh}
  />
</div>

<style lang="scss">
  @import '../styles/controls.scss';
</style>
