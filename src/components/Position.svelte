<script>
  import { createEventDispatcher } from 'svelte'
  import InputRange from './InputRange.svelte'

  const dispatch = createEventDispatcher()

  export let coordX
  export let coordY
  export let maxX
  export let maxY
  const label = 'Position'

  function update(value) {
    dispatch('input', {
      value,
    })
  }
</script>

<fieldset data-cy="position">
  <legend>{label}</legend>
  <InputRange
    bind:value={coordX}
    label="x"
    max={maxX}
    on:input={() => update(coordX)}
  />
  <InputRange
    bind:value={coordY}
    label="y"
    max={maxY}
    on:input={() => update(coordY)}
  />
</fieldset>
