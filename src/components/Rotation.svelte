<script>
  import { createEventDispatcher } from 'svelte'
  import InputRange from './InputRange.svelte'

  const dispatch = createEventDispatcher()

  export let angle
  const label = 'Rotation'

  function update(value) {
    dispatch('input', {
      value,
    })
  }
</script>

<fieldset class="rotation" data-cy="rotation">
  <legend>{label}</legend>
  <!--https://css-tricks.com/accessible-svgs/-->
  <!-- <svg id="InteractiveSVG" role="group" /> -->
  <InputRange bind:value={angle} max={360} on:input={() => update(angle)} />
</fieldset>

<!-- <style lang="scss">
  @import '../styles/rotation.scss';
</style> -->
