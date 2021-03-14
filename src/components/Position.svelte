<script>
  import InputRange from './InputRange.svelte'

  import {createEventDispatcher} from 'svelte'

  const dispatch = createEventDispatcher()

  // @ts-check
  export let xCoord
  export let yCoord
  export let maxX
  export let maxY

  const handleXChange = () => {
    dispatch('input', {
      value: xCoord,
    })
  }
  const handleYChange = () => {
    dispatch('input', {
      value: yCoord,
    })
  }
</script>

<InputRange bind:value={xCoord} label="x" max={maxX} on:input={handleXChange} />

<InputRange bind:value={yCoord} label="y" max={maxY} on:input={handleYChange} />
