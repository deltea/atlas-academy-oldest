<script lang="ts">
  import PageLanding from "$lib/components/PageLanding.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  const date = new Date(data.post.date);

  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
</script>

<PageLanding center src={data.post.cover}>
  <small class="uppercase text-sm tracking-widest">
    {formattedDate}
    |
    <span class="inline-flex gap-2">
      {#each data.post.tags as tag}
        <a href="/destinations/{tag}" class="hover:text-blue-500 duration-200">{tag}</a>
      {/each}
    </span>
  </small>
  <h1 class="text-3xl tracking-wider uppercase">{data.post.title}</h1>
</PageLanding>

<div class="flex justify-center px-sm py-4">
  <main class="text-normal dark:text-white w-3/4">
    {@html data.post.body}
  </main>
</div>

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
    @apply my-8 object-cover w-full h-full;
  }
  main :global(p) {
    @apply leading-7 my-8 text-lg font-light;
  }
  main :global(div) {
    @apply grid grid-flow-col justify-center items-center gap-2;
  }
</style>
