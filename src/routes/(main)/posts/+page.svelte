<script lang="ts">
  import type { PageData } from './$types';
  import PostCard from '$lib/components/PostCard.svelte';

  export let data: PageData;
</script>

<div class="grid grid-cols-3 gap-4 m-4">
  {#each data.posts as post}
    <PostCard post={post} urlPrefix="/post" width="100%" />
  {/each}
</div>
