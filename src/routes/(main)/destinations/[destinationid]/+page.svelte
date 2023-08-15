<script lang="ts">
	import PageLanding from "$lib/components/PageLanding.svelte";
  import PostCard from "$lib/components/PostCard.svelte";
  import { getImage } from "$lib/utils";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<PageLanding src={getImage(data.tag.image)}>
  <h1 class="text-3xl tracking-wider uppercase">{data.tag.name}</h1>
</PageLanding>

<div class="px-sm pb-16">
  <div class="flex flex-col gap-4 mt-20 mb-4">
    <h3 class="tracking-widest font-semibold text-light dark:text-neutral-200">{data.tag.name.toLowerCase()}</h3>
    <hr class="w-12 border-blue-500 border-sm">
  </div>

  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-semibold uppercase">{data.tag.heading}</h1>
    <p class="text-light dark:text-neutral-200">{data.tag.description}</p>
  </div>

  <div class="flex flex-col gap-4 mt-20 mb-8">
    <h3 class="tracking-widest font-semibold text-light dark:text-neutral-200">all posts</h3>
    <hr class="w-12 border-blue-500 border-sm">
  </div>

  <main class="grid grid-cols-4 gap-4">
    {#each data.posts as post}
      <PostCard type={post.type} url="/post/{post.slug}" title={post.title} cover={post.cover} />
    {/each}
  </main>
</div>
