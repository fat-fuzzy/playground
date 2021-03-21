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

  function update(value) {
    dispatch('input', {
      value,
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
    on:input={() => update(scaleX)}
  />

  <InputRange
    bind:value={scaleY}
    label="y"
    min={minY}
    max={maxY}
    {step}
    on:input={() => update(scaleY)}
  />
</fieldset>

<style lang="scss">
  fieldset {
    display: flex;
    flex-direction: column;
  }
</style>
