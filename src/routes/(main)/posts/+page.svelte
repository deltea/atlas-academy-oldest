<script lang="ts">
  import type { PageData } from './$types';
  import PostCard from '$lib/components/PostCard.svelte';

  export let data: PageData;
</script>

{#each data.posts as post}
  <PostCard post={post} urlPrefix="/post/" />
{/each}
