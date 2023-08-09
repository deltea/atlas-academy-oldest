<script lang="ts">
  import PostCard from "$lib/components/PostCard.svelte";
  import type { PageData } from "./$types";

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

<div class="grid grid-cols-3 gap-2 m-4">
  {#each data.posts as post}
    <PostCard post={post} urlPrefix="/admin/edit" width="100%" />
  {/each}
</div>
