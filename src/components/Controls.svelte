<script>
  import { onMount } from 'svelte'

  import * as constants from '../types/constants.js'
  import { uiState } from '../stores.js'
  import EmojiButton from './EmojiButton.svelte'

  // UI feedback
  let playgroundState

  const uiStateUnsub = uiState.subscribe((value) => {
    playgroundState = value
  })

  export let play = () => {}
  export let stop = () => {}
  export let refresh = () => {}
  export let toggleHandles = () => {}

  function playFocus() {
    if (playgroundState === constants.uiState.DEFAULT) {
      uiState.set(constants.uiState.FOCUS)
    }
  }

  // function playBlur() {
  //   if (playgroundState === constants.uiState.FOCUS) {
  //     uiState.set(constants.uiState.DEFAULT)
  //   }
  // }

  onMount(() => {
    return () => {
      uiStateUnsub()
    }
  })
</script>

<!-- handleBlur={playBlur} -->
<div class="btn-group ui-controls">
  <EmojiButton
    dataCy="btn-play"
    buttonClass="firestarter"
    buttonLabel="Play"
    handleClick={play}
    handleFocus={playFocus}
  />
  <EmojiButton
    dataCy="btn-stop"
    buttonClass="sponge"
    buttonLabel="Stop"
    handleClick={stop}
  />
  <EmojiButton
    dataCy="btn-refresh"
    buttonClass="shower"
    buttonLabel="Refresh"
    handleClick={refresh}
  />
  <EmojiButton
    dataCy="btn-handles"
    buttonClass="joystick"
    buttonLabel="Handles"
    handleClick={toggleHandles}
  />
</div>

<style lang="scss">
  @import '../styles/controls.scss';
</style>
