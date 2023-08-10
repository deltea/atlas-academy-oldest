<script lang="ts">
  import type { PageData } from "./$types";
	import PageLanding from "$lib/components/PageLanding.svelte";
  import PostCard from "$lib/components/PostCard.svelte";

  export let data: PageData;
</script>

<PageLanding center src="https://source.unsplash.com/random">
  <h1 class="text-3xl tracking-wider uppercase">Blog</h1>
</PageLanding>

<div class="p-sm">
  <main class="grid grid-cols-4 gap-4">
    {#each data.posts as post}
      <PostCard url="/post/{post.slug}" title={post.title} cover={post.cover} />
  {/each}
  </main>
</div>
