<script>
  import {createEventDispatcher} from 'svelte'
  import {animations} from '../stores.js'

  const dispatch = createEventDispatcher()
  let menumItems = []

  animations.subscribe((value) => {
    menumItems = value
  })

  const handleClick = (event) => {
    const element = event.target
    dispatch('loadAnimation', {
      animationId: element.getAttribute('data-id'),
    })
  }
</script>

<nav data-cy="animations-menu" class="animations-menu">
  <ul>
    {#each menumItems as {name, id, type}}
      <li
        class="btn-menu {type}"
        on:click={handleClick}
        data-id={id}
        data-cy={id}
      >
        <!--TODO: make routes for animations-->
        {name}
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  @import '../styles/animations-menu.scss';
</style>
