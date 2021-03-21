<script>
  import { createEventDispatcher } from 'svelte'
  import InputRange from './InputRange.svelte'

  const dispatch = createEventDispatcher()

  export let angle = 0
  export let max = 0
  const label = 'Rotation'

  function update() {
    dispatch('input', {
      value: angle,
    })
  }
</script>

<fieldset class="rotation" data-cy="rotation">
  <legend>{label}</legend>
  <!--https://css-tricks.com/accessible-svgs/-->
  <!-- <svg id="InteractiveSVG" role="group" /> -->
  <InputRange bind:value={angle} {max} on:input={update} />
</fieldset>

<!-- <style lang="scss">
  @import '../styles/rotation.scss';
</style> -->
