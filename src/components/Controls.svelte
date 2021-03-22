<script>
  import { onMount } from 'svelte'

  import EmojiButton from './EmojiButton.svelte'

  export let play = () => {}
  export let stop = () => {}
  export let toggleContextMenu = () => {}
  export let showHandles

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
    buttonClass="play"
    buttonLabel="👾 Play"
    handleClick={() => play()}
  />
  <EmojiButton
    dataCy="btn-stop"
    buttonClass="stop"
    buttonLabel="🏁 Stop"
    handleClick={() => stop()}
  />
  {#if showHandles}
    <EmojiButton
      dataCy="btn-handles"
      buttonClass="handles"
      buttonLabel="🕹 Handles"
      handleClick={() => toggleContextMenu()}
    />
  {/if}
</div>

<style lang="scss">
  @media (min-aspect-ratio: 1/1) {
    .ui-controls {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>
