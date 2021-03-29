<script>
  import { createEventDispatcher } from 'svelte'
  import InputRange from './InputRange.svelte'

  const dispatch = createEventDispatcher()

  export let coordX = 0
  export let coordY = 0
  export let maxX = 0
  export let maxY = 0
  const label = 'Position'

  function updateX() {
    dispatch('input', {
      value: coordX,
    })
  }

  function updateY() {
    dispatch('input', {
      value: coordY,
    })
  }
</script>

<fieldset data-cy="position">
  <legend>{label}</legend>
  <InputRange bind:value={coordX} label="x" max={maxX} on:input={updateX} />
  <InputRange bind:value={coordY} label="y" max={maxY} on:input={updateY} />
</fieldset>

<style lang="scss">
  @import '../styles/common/fieldset.scss';
</style>
