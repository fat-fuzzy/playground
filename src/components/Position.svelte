<script>
  import { createEventDispatcher } from 'svelte'
  import InputRange from './InputRange.svelte'

  const dispatch = createEventDispatcher()

  export let coordX
  export let coordY
  export let maxX
  export let maxY
  const label = 'Position'

  function handleChangeX() {
    dispatch('input', {
      value: coordX,
    })
  }
  function handleChangeY() {
    dispatch('input', {
      value: coordY,
    })
  }
</script>

<fieldset data-cy="position">
  <legend>{label}</legend>
  <InputRange
    bind:value={coordX}
    label="x"
    max={maxX}
    on:input={handleChangeX}
  />
  <InputRange
    bind:value={coordY}
    label="y"
    max={maxY}
    on:input={handleChangeY}
  />
</fieldset>
