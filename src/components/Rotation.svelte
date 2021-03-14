<script>
  // import {createEventDispatcher} from 'svelte'

  // const dispatch = createEventDispatcher()

  // // @ts-check
  // export let xRad = 0
  // export let yRad = 0
  // export let maxX
  // export let maxY

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
</script>

<div class="rotation" data-cy="rotation">
  <!--https://css-tricks.com/accessible-svgs/-->
  <svg id="InteractiveSVG" role="group" />
</div>

<style lang="scss">
  @import '../styles/rotation.scss';
</style>
