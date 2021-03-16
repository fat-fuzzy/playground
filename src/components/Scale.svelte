<script>
  import InputRange from './InputRange.svelte'

  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  // @ts-check
  export let scaleX
  export let scaleY
  export let minX
  export let maxX
  export let minY
  export let maxY

  const step = '0.01'
  const label = 'Scale'

  function handleChangeX() {
    dispatch('input', {
      value: scaleX,
    })
  }
  function handleChangeY() {
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
    on:input={handleChangeX}
  />

  <InputRange
    bind:value={scaleY}
    label="y"
    min={minY}
    max={maxY}
    {step}
    on:input={handleChangeY}
  />
</fieldset>

<style>
  fieldset {
    display: flex;
    flex-direction: column;
  }
</style>
