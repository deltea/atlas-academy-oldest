<script lang="ts">
  import PageLanding from "$lib/components/PageLanding.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<PageLanding center src={data.post.cover}>
  <small class="uppercase text-sm tracking-widest">{data.post.date} | {data.post.tags.join(", ")}</small>
  <h1 class="text-3xl tracking-wider uppercase">{data.post.title}</h1>
</PageLanding>

<main class="px-sm pb-sm pt-4 text-normal w-2/3">
  {@html data.post.body}
</main>

<style>
  main :global(h1) {
    @apply text-2xl font-semibold my-8 uppercase;
  }
  main :global(figure) {
    @apply w-full my-8 text-center;
  }
  main :global(figcaption) {
    @apply text-neutral-500 uppercase font-semibold mt-2 text-sm;
  }
  main :global(img) {
    @apply w-full;
  }
  main :global(p) {
    @apply leading-7 my-8 text-lg font-light;
  }
</style>
