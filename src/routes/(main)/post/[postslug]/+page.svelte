<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils';

  export let data: PageData;
</script>

<div class="w-full grid gap-4 bg-amber-50 p-8">
  <h1 class="text-5xl font-bold">{data.post.title}</h1>
  <div class="flex gap-2 items-center">
    <p class="italic">{formatDate(data.post.date)}</p>
    {#each data.post.tags as tag}
      <a href="/" class="btn btn-xs normal-case btn-outline">#{tag}</a>
    {/each}
  </div>
  <p class="font-medium italic">{data.post.description}</p>
</div>
<div class="flex justify-between">
  <main class="m-8 w-4/6">
    {@html data.post.body}
  </main>
  <aside class="w-2/6 sticky top-0 bg-red-50 h-full">
    Hello
  </aside>
</div>

<style>
  main :global(h1) {
    @apply font-semibold text-4xl my-6;
  }
  main :global(figure) {
    @apply my-8 w-full text-center;
  }
  main :global(figcaption) {
    @apply text-neutral-400 mt-1 italic;
  }
  main :global(img) {
    @apply rounded-md w-full;
  }
  main :global(ol) {
    @apply list-decimal;
  }
  main :global(ul) {
    @apply list-disc;
  }
  main :global(a) {
    @apply underline;
  }
</style>
