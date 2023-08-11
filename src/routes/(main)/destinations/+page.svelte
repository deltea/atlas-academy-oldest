<script lang="ts">
  import type { PageData } from "./$types";
  import PageLanding from "$lib/components/PageLanding.svelte";
  import { fade } from "svelte/transition";

  export let data: PageData;
</script>

<PageLanding center src="https://source.unsplash.com/random">
  <h1 class="text-3xl tracking-wider uppercase">Destinations</h1>
</PageLanding>

<div class="grid grid-cols-3 gap-2 gap-y-8e p-sm">
  {#each data.tags as tag}
    <a href="/destinations/{tag.slug}" class="flex flex-col gap-4 text-sm uppercase font-semibold text-light dark:text-neutral-200 group text-center" transition:fade>
      <div
        class="group-hover:brightness-75 brightness-100 duration-300 w-full h-80 bg-cover bg-center rounded-sm"
        style:background-image="url('{tag.image}')"
      />
      <h1>{tag.name}</h1>
    </a>
  {/each}
</div>
