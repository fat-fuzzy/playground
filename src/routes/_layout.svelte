<script>
  import Nav from '../components/Nav.svelte'

  export let segment
</script>

<Nav {segment} />
<Menu on:input={loadAnimation} />

<main class="grid" style={`cursor: ${customCursor}`}>
  <slot />
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

<style lang="scss" global>
  @import '../styles/config/main.scss';
</style>


<style lang="scss">
  @import '../styles/components/playground.scss';
</style>
