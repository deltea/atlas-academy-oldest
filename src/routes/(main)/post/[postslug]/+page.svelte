<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import PageLanding from "$lib/components/PageLanding.svelte";
  import { formatDate } from "$lib/utils";

  import IconRight from "~icons/gg/arrow-right";
  import IconLeft from "~icons/gg/arrow-left";

  export let data: PageData;

  let formattedDate: string;

  page.subscribe(() => {
    formattedDate = formatDate(data.post.date);
  });

</script>

<PageLanding center src={data.post.cover}>
  <small class="uppercase text-sm tracking-widest">
    {formattedDate} |
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

<nav class="flex justify-between mx-8 py-4">
  {#if data.previousPost}
    <a href="/post/{data.previousPost.slug}" class="group p-8 flex flex-col items-start">
      <IconLeft class="text-xl group-hover:-translate-x-2 duration-200" />
      <h2 class="text-lg font-bold">{data.previousPost.title}</h2>
      <small>{formatDate(data.previousPost.date, "sm")}</small>
    </a>
  {/if}

  <div />

  {#if data.nextPost}
    <a href="/post/{data.nextPost.slug}" class="group p-8 flex flex-col items-end">
      <IconRight class="text-xl group-hover:translate-x-2 duration-200" />
      <h2 class="text-lg font-bold">{data.nextPost.title}</h2>
      <small>{formatDate(data.nextPost.date, "sm")}</small>
    </a>
  {/if}
</nav>

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
