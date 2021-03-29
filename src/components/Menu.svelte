<script>
  import { createEventDispatcher } from 'svelte'
  import { animations } from '../stores.js'

  const dispatch = createEventDispatcher()
  let menumItems = []

  function getLabel(emoji, name) {
    return `${emoji} ${name}`
  }
  animations.subscribe((value) => {
    menumItems = value
  })

  const handleClick = (event) => {
    const element = event.target
    dispatch('input', {
      animationId: element.getAttribute('data-id'),
    })
  }
</script>

<nav data-cy="nav" class="nav">
  <ul>
    {#each menumItems as { name, emoji, id, type }}
      <li
        class="btn-menu {type}"
        on:click={handleClick}
        data-id={id}
        data-cy={id}
      >
        <!--TODO: make routes for animations-->
        {getLabel(emoji, name)}
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  // this menu will be the app nav. TODO: routes
  @import '../styles/components/nav.scss';
</style>
