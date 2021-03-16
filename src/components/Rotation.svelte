<script>
  import { createEventDispatcher } from 'svelte'
  import InputRange from './InputRange.svelte'

  const dispatch = createEventDispatcher()

  export let angle
  const label = 'Rotation'

  // const handleXRadChange = () => {
  //   dispatch('updateXRad', {
  //     value: xRad,
  //   })
  // }
  // const handleYRadChange = () => {
  //   dispatch('updateYRad', {
  //     value: yRad,
  //   })
  // }
  function handleChange() {
    dispatch('input', {
      value: angle,
    })
  }
</script>

<fieldset class="rotation" data-cy="rotation">
  <legend>{label}</legend>
  <!--https://css-tricks.com/accessible-svgs/-->
  <!-- <svg id="InteractiveSVG" role="group" /> -->
  <InputRange bind:value={angle} max={360} on:input={handleChange} />
</fieldset>

<!-- <style lang="scss">
  @import '../styles/rotation.scss';
</style> -->
