<script lang="ts">
  import type { PageData } from './$types';
	import HorizontalScroll from '$lib/components/HorizontalScroll.svelte';

  export let data: PageData;
</script>

<HorizontalScroll items={data.blogPosts} header="Podcast Posts" />
<HorizontalScroll items={data.reflectionPosts} header="Reflections" />
