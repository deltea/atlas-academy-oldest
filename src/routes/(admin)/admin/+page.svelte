<script lang="ts">
  import { getImage } from "$lib/utils";
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

      <div class="dropdown dropdown-end">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-neutral normal-case font-bold">+ Create New</label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="/admin/create/post"><IconPost />Post</a></li>
          <li><a href="/admin/create/tag"><IconTag />Tag</a></li>
        </ul>
      </div>
    </div>
  </header>

  <aside class="col-span-2 row-start-2 row-span-full h-full overflow-x-auto space-y-1 p-2">
    <input
      type="radio"
      name="tab"
      value="posts"
      id="posts"
      class="hidden peer/posts"
      bind:group={selectedTab}
    />
    <label for="posts" class="w-full hover:bg-neutral-100 rounded-md p-3 hover:cursor-pointer inline-flex items-center gap-2 peer-checked/posts:bg-neutral-200 duration-300">
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
    <label for="tags" class="w-full hover:bg-neutral-100 rounded-md p-3 hover:cursor-pointer inline-flex items-center gap-2 peer-checked/tags:bg-neutral-200 duration-300">
      <IconTag />
      Tags
    </label>
  </aside>

  {#if selectedTab === "posts"}
    <div class="grid grid-cols-3 gap-4 m-4 col-span-8 row-start-2">
      {#each data.posts as post}
        <a href="/admin/edit/post/{post.slug}" class="flex flex-col gap-4 text-sm uppercase font-semibold text-light group" transition:fade>
          <div
            class="w-full h-40 bg-cover bg-center rounded-sm relative"
            style:background-image="url('{getImage(post.cover, "sm")}')"
          >
            <div class="inline-flex group-hover:opacity-100 opacity-0 gap-2 items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-300">
              <a class="btn btn-sm" href="/admin/edit/post/{post.slug}">Edit</a>
              <a class="btn btn-sm btn-outline border-white text-white hover:bg-white hover:border-white hover:text-neutral" href="/post/{post.slug}">View</a>
            </div>
          </div>
          <h1>{post.title}</h1>
        </a>
      {/each}
    </div>
  {:else}
    <div class="grid grid-cols-3 gap-4 gap-y-8 m-4 col-span-8 row-start-2">
      {#each data.tags as tag}
        <a href="/admin/edit/tag/{tag.slug}" class="flex flex-col gap-4 text-sm uppercase font-semibold text-light group text-center" transition:fade>
          <div
            class="w-full h-80 bg-cover bg-center rounded-sm relative"
            style:background-image="url('{getImage(tag.image, "sm")}')"
          >
            <div class="inline-flex group-hover:opacity-100 opacity-0 gap-2 items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-300">
              <a class="btn btn-sm" href="/admin/edit/tag/{tag.slug}">Edit</a>
              <a class="btn btn-sm btn-outline border-white text-white hover:bg-white hover:border-white hover:text-neutral" href="/destinations/{tag.slug}">View</a>
            </div>
          </div>
          <h1>{tag.name}</h1>
        </a>
      {/each}
    </div>
  {/if}
</main>
