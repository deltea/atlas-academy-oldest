<script lang="ts">
	import PodcastLinks from "./../../lib/components/PodcastLinks.svelte";
  import type { PageData } from './$types';
	import HorizontalScroll from '$lib/components/HorizontalScroll.svelte';

  export let data: PageData;
</script>

<HorizontalScroll items={data.blogPosts} header="Podcast Posts" href="/posts" />
<HorizontalScroll items={data.reflectionPosts} header="Reflections" />

<div class="w-60">
  <PodcastLinks />
</div>
