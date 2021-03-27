<script>
  import { onMount } from 'svelte'

  import EmojiButton from './EmojiButton.svelte'

  export let play = () => {}
  export let stop = () => {}
  export let toggleSidebar = () => {}
  export let showHandles

  onMount(() => {
    return () => {
      uiStateUnsub()
    }
  })
</script>

<!-- handleBlur={playBlur} -->
<div class="controls">
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
      handleClick={() => toggleSidebar()}
    />
  {/if}
</div>

<style lang="scss">
  @import '../styles/components/controls.scss';
</style>
