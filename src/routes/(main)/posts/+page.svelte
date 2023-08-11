<script lang="ts">
  import type { PageData } from "./$types";
	import PageLanding from "$lib/components/PageLanding.svelte";
  import PostCard from "$lib/components/PostCard.svelte";

  import IconSearch from "~icons/gg/search";

  export let data: PageData;
</script>

<PageLanding center src="https://source.unsplash.com/random">
  <h1 class="text-3xl tracking-wider uppercase">Blog</h1>
</PageLanding>

<div class="p-sm">
  <form method="get" class="mb-8 relative" data-sveltekit-keepfocus data-sveltekit-noscroll>
    <label for="search" class="text-xl  text-normal absolute top-1/2 left-3 -translate-y-1/2">
      <IconSearch />
    </label>

    <input
      type="search"
      name="search"
      id="search"
      placeholder="Search all posts..."
      class="w-full text-normal bg-white p-3 pl-12 outline-none rounded-sm"
    />
  </form>

  <h1 class="mb-4 text-xl">
    {#if data.showingAll}
      Showing all results
    {:else if data.count}
      Showing {data.count} results
    {:else}
      No results
    {/if}
  </h1>

  <main class="grid grid-cols-4 gap-4">
    {#each data.posts as post}
      <PostCard url="/post/{post.slug}" title={post.title} cover={post.cover} />
    {/each}
  </main>
</div>
