<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { fetchDocs, type PostData, type PostType } from '$lib/firebase';
  import PostCard from '$lib/components/PostCard.svelte';
  import { page } from '$app/stores';
  import Spinner from '$lib/components/Spinner.svelte';

  export let data: PageData;

  const q: string = $page.url.searchParams.get("q") ?? "";
  const type: PostType | null = $page.url.searchParams.get("type") as PostType;
  const tags: string[] = $page.url.searchParams.get("tags")?.split(",") ?? [];

  let loading = true;
  let posts: PostData[] = [];

  onMount(async () => {
    loading = true;

    posts = await fetchDocs("posts") as PostData[];
    posts = posts.filter(post => {
      const titleHasQ = q ? post.title.toLowerCase().includes(q.toLowerCase()) : true;
      const qHasTitle = q ? q.toLowerCase().includes(post.title.toLowerCase()) : true;
      const qType = type ? post.type === type : true;
      const tagsHasQ = tags.length ? post.tags.some(tag => tags.includes(tag)) : true;

      console.log(post.title, titleHasQ, qHasTitle, qType, tagsHasQ);

      return (
        (titleHasQ || qHasTitle) && qType && tagsHasQ
      );
    });

    loading = false;
  });
</script>

{#if loading}
  <Spinner />
{/if}

<div class="grid grid-cols-3 gap-4 m-4">
  {#each posts as post}
    <PostCard post={post} urlPrefix="/post" width="100%" />
  {/each}
</div>
