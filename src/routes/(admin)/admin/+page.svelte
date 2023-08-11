<script lang="ts">
  import type { PageData } from "./$types";
  import { fade } from "svelte/transition";

  import IconMap from "~icons/bxs/map";
  import IconPost from "~icons/gg/file-document";
  import IconTag from "~icons/gg/tag";

  export let data: PageData;

  let selectedTab: "posts" | "tags" = "posts";
</script>

<main class="h-screen grid grid-cols-10 grid-rows-9">
  <header class="flex p-4 justify-between bg-amber-50 items-center row-span-1 col-span-full">
    <a href="/" class="btn btn-outline normal-case font-bold">
      ⮜ Back to Homepage
    </a>

    <h1 class="font-bold text-2xl italic">Admin</h1>

    <div class="inline-flex gap-2">
      <a href="/admin/map" class="btn btn-outline normal-case">
        <IconMap /> Edit map
      </a>
      <a href="/admin/create" class="btn btn-neutral normal-case font-bold">
        + Create New
      </a>
    </div>
  </header>

  <aside class="col-span-2 row-start-2 row-span-full h-full overflow-x-auto space-y-2 p-2">
    <input
      type="radio"
      name="tab"
      value="posts"
      id="posts"
      class="hidden peer/posts"
      bind:group={selectedTab}
    />
    <label for="posts" class="w-full hover:bg-neutral-200 rounded-md p-3 hover:cursor-pointer inline-flex items-center gap-2 peer-checked/posts:bg-neutral-200">
      <IconPost />
      Posts
    </label>

    <input
      type="radio"
      name="tab"
      value="tags"
      id="tags"
      class="hidden peer/tags"
      bind:group={selectedTab}
    />
    <label for="tags" class="w-full hover:bg-neutral-200 rounded-md p-3 hover:cursor-pointer inline-flex items-center gap-2 peer-checked/tags:bg-neutral-200">
      <IconTag />
      Tags
    </label>
  </aside>

  {#if selectedTab === "posts"}
    <div class="grid grid-cols-3 gap-2 m-4 col-span-8 row-start-2">
      {#each data.posts as post}
        <a href="/admin/edit/{post.slug}" class="flex flex-col gap-4 text-sm uppercase font-semibold text-light group" transition:fade>
          <div
            class="group-hover:brightness-75 brightness-100 duration-300 w-full h-40 bg-cover bg-center rounded-sm"
            style:background-image="url('{post.cover}')"
          />
          <h1>{post.title}</h1>
        </a>
      {/each}
    </div>
  {:else}
    <div class="grid grid-cols-3 gap-2 m-4 col-span-8 row-start-2">
      {#each data.tags as tag}
        <a href="/admin/edit/{tag.slug}" class="flex flex-col gap-4 text-sm uppercase font-semibold text-light group text-center" transition:fade>
          <div
            class="group-hover:brightness-75 brightness-100 duration-300 w-full h-80 bg-cover bg-center rounded-sm"
            style:background-image="url('{tag.image}')"
          />
          <h1>{tag.name}</h1>
        </a>
      {/each}
    </div>
  {/if}
</main>
