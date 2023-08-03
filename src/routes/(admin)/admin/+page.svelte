<script lang="ts">
  import PostCard from "$lib/components/PostCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<header class="flex p-4 justify-between bg-amber-50 items-center">
  <a href="/admin/create" class="btn btn-outline normal-case font-bold">
    + Create New
  </a>
  <h1 class="font-bold text-2xl italic">Admin</h1>
  <div></div>
</header>

<div class="grid grid-cols-3 gap-2 m-4">
  {#each data.posts as post}
    <PostCard post={post} urlPrefix="/admin/edit" class="card bg-base-100 shadow-xl min-w-full max-w-full max-h-96 hover:scale-[101%] duration-fast group" />
  {/each}
</div>
