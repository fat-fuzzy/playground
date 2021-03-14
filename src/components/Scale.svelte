<script>
  import InputRange from './InputRange.svelte'

  import {createEventDispatcher} from 'svelte'

  const dispatch = createEventDispatcher()
  // @ts-check
  export let xScale
  export let yScale
  export let minX
  export let maxX
  export let minY
  export let maxY

  const step = '0.01'

  const handleXChange = () => {
    dispatch('input', {
      value: xScale,
    })
  }
  const handleYChange = () => {
    dispatch('input', {
      value: yScale,
    })
  }
</script>

<InputRange
  bind:value={xScale}
  label="scale x"
  min={minX}
  max={maxX}
  {step}
  on:input={handleXChange}
/>

<InputRange
  bind:value={yScale}
  label="scale y"
  min={minY}
  max={maxY}
  {step}
  on:input={handleYChange}
/>
