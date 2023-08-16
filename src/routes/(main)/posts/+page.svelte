<script lang="ts">
  import type { PageData } from "./$types";
	import PageLanding from "$lib/components/PageLanding.svelte";
  import PostCard from "$lib/components/PostCard.svelte";
  import { getImage } from "$lib/utils";
  import type { PostData } from "$lib/firebase";
  import { onMount } from "svelte";

  import IconSearch from "~icons/gg/search";

  export let data: PageData;

  const batch = 8;
  let postsGrid: HTMLElement;
  let posts: PostData[] = [];
  let postsNum = 8;

  $: posts = data.posts.slice(0, postsNum);

  function loadMorePosts() {
    const bottom = postsGrid.getBoundingClientRect().bottom - (window.innerHeight);
    console.log(bottom);
    if (bottom < 0) {
      postsNum += batch;
    }
  }

  onMount(() => {
    window.addEventListener("scroll", loadMorePosts);
    return () => window.removeEventListener("scroll", loadMorePosts);
  });
</script>

<PageLanding center src={getImage("blog.webp", "md", "library")}>
  <h1 class="text-3xl tracking-wider uppercase">Blog</h1>
</PageLanding>

<div class="lg:p-sm p-xs">
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

  <main class="grid lg:grid-cols-4 gap-4" bind:this={postsGrid}>
    {#each posts as post}
      <PostCard type={post.type} url="/post/{post.slug}" title={post.title} cover={post.cover} />
    {/each}
  </main>
</div>
