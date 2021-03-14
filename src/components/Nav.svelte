<script>
  export let segment
</script>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        Playground
      </a>
    </li>
    <!-- <li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li> -->

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <!-- <li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li> -->
  </ul>
</nav>

<style lang="scss">
  @import '../styles/variables.scss';
  @import '../styles/nav.scss';
</style>
