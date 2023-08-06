<script lang="ts">
	import { slide } from "svelte/transition";
  import type { PageData } from './$types';
  import PostCard from '$lib/components/PostCard.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import IconUp from '~icons/gg/chevron-up';
  import IconDown from '~icons/gg/chevron-down';
    import Marker from "$lib/components/Marker.svelte";

  export let data: PageData;

  let search = data.query.q ?? "";
  let type = data.query.type;
  let tags: string[] = data.query.tags;
  let mapShow = true;

  async function refresh() {
    const searchParam = search ? `q=${search}&` : "";
    const typeParam = type ? `type=${type}&` : "";
    const tagsParam = tags.length > 0 ? `tags=${tags.join(",")}&` : "";
    goto(`/posts?${searchParam}${typeParam}${tagsParam}`);
  }

  function clearFilters() {
    search = "";
    type = "";
    tags = [];

    refresh();

    type = "all";
  }

  onMount(() => {
    setTimeout(() => {
      console.log(data.query.tags);
      tags = data.query.tags;
    }, 1000);
  });
</script>

<div class="border border-neutral m-8 p-4 rounded-lg bg-white flex flex-col justify-center gap-2">
  <form on:submit|preventDefault={refresh} class="flex gap-2 items-stretch">
    <select
      name="type"
      id="type"
      class="p-2 rounded-full outline-none border border-neutral"
      bind:value={type}
      on:change={refresh}
    >
      <option value="all">All</option>
      <option value="blog">Blog</option>
      <option value="reflection">Reflection</option>
    </select>

    <input
      type="search"
      name="search"
      id="search"
      class="p-2 flex-grow outline-none border border-neutral rounded-full px-6"
      placeholder="Search posts..."
      bind:value={search}
    />

    <button type="submit" class="btn btn-neutral rounded-full">Go!</button>
  </form>

  {#if mapShow}
    <div class="relative" transition:slide={{ axis: "y" }}>
      <img
        src="/map.png"
        alt="World Map"
      />

      {#each data.markers as marker}
        <Marker x={marker.x} y={marker.y} url="/posts?tags={marker.tag}" />
      {/each}
    </div>
  {/if}

  <button on:click={() => mapShow = !mapShow} class="btn btn-outline btn-sm normal-case">
    {#if mapShow}
      Hide map <IconUp />
    {:else}
      Show map <IconDown />
    {/if}
  </button>
</div>

<div class="flex justify-between">
  <aside class="sticky h-screen top-0 w-1/6 flex flex-col justify-center bg-amber-50 p-8">
    <div class="mb-4">
      <button class="btn btn-outline normal-case" on:click={clearFilters}>
        Clear all filters
      </button>
    </div>
    <ul class="overflow-y-scroll flex flex-col gap-2">
      {#each data.allTags as tag}
        <li class="flex items-center gap-2">
          <label for={`checkbox-${tag}`} class="hover:cursor-pointer">#{tag}</label>
          <input
            type="checkbox"
            id={`checkbox-${tag}`}
            class="checkbox"
            value={tag}
            bind:group={tags}
            on:change={refresh}
          />
        </li>
      {/each}
    </ul>
  </aside>

  <div class="w-5/6 mx-6">
    <h2 class="text-neutral font-bold text-3xl mb-8">
      {#if data.query.q.length === 0 && data.query.tags.length === 0 && data.query.type === "all"}
        Showing all posts
      {:else if data.posts.length > 0}
        Showing
        {data.posts.length}
        {#if data.query.type === "all"}
          post
        {:else if data.query.type === "blog"}
          blog post
        {:else if data.query.type === "reflection"}
          reflection
        {/if}
        {#if data.posts.length > 1}
          <span style='margin-left: -8px;'>s</span>
        {/if}

        {#if data.query.q.length > 0}
          for "{data.query.q}"
        {/if}

        {#if data.query.tags.length > 0}
          with tags: {data.query.tags.join(", ")}
        {/if}
      {:else}
        No results
      {/if}
    </h2>

    <div class="grid grid-cols-2 gap-4 w-full">
      {#each data.posts as post}
        <PostCard post={post} urlPrefix="/post" width="100%" />
      {/each}
    </div>
  </div>
</div>
