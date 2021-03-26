<script>
  import InputRange from './InputRange.svelte'

  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  // @ts-check
  export let scaleX = 0
  export let scaleY = 0
  export let minX = 0
  export let maxX = 0
  export let minY = 0
  export let maxY = 0

  const step = '0.01'
  const label = 'Scale'

  function updateX() {
    dispatch('input', {
      value: scaleX,
    })
  }

  function updateY() {
    dispatch('input', {
      value: scaleY,
    })
  }
</script>

<fieldset data-cy="scale">
  <legend>{label}</legend>
  <InputRange
    bind:value={scaleX}
    label="x"
    min={minX}
    max={maxX}
    {step}
    on:input={updateX}
  />

  <InputRange
    bind:value={scaleY}
    label="y"
    min={minY}
    max={maxY}
    {step}
    on:input={updateY}
  />
</fieldset>

<style lang="scss">
  // fieldset {
  //   display: flex;
  //   flex-direction: column;
  // }
</style>
