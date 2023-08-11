<script lang="ts">
  import type { PageData } from "./$types";
  import { fade } from "svelte/transition";

  import IconMap from "~icons/bxs/map";

  export let data: PageData;
</script>

<header class="flex p-4 justify-between bg-amber-50 items-center">
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

<div class="grid grid-cols-4 gap-2 m-4">
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
