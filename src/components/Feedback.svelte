<script>
  import * as constants from '../types/constants.js'

  import {onMount} from 'svelte'

  import {uiState} from '../stores.js'
  // UI feedback
  export let stacktrace = ''

  let playgroundState
  let hidden

  const uiStateUnsub = uiState.subscribe((value) => {
    playgroundState = value
    hidden = playgroundState !== constants.uiState.ERROR ? 'hidden' : ''
  })

  onMount(() => {
    return () => {
      uiStateUnsub()
    }
  })
</script>

<div class={`feedback ${hidden}`} data-cy="feedback">
  <pre class="stacktrace" data-cy="stacktrace">{stacktrace}</pre>
</div>

<style lang="scss">
  .hidden {
    display: none;
  }
</style>
