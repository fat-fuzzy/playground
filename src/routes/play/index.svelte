<script context="module">
  export function preload() {
    return this.fetch(`scene.json`)
      .then((r) => r.json())
      .then((scenes) => {
        return {scenes}
      })
  }
</script>

<script>
  export let scenes
</script>

<svelte:head>
  <title>👾 Playground</title>
</svelte:head>

<h1>Recent scenes</h1>

<ul>
  {#each scenes as scene}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li><a rel="prefetch" href="scene/{scene.slug}">{scene.title}</a></li>
  {/each}
</ul>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>
