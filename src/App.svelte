<script>
  import Playground from './components/Playground.svelte'
</script>

<Playground />

<style lang="scss">
  :global {
    @import './styles/config/main.scss';
    .playground {
      @include cover();
      @include layout-app();
    }
  }
</style>
