<script lang="ts">
  import type { PageData } from "./$types";
  import PageLanding from "$lib/components/PageLanding.svelte";
  import Marker from "$lib/components/Marker.svelte";
  import { fade } from "svelte/transition";

  export let data: PageData;

  let tags = data.tags;

  function sortByContinent(continent: string) {
    console.log(data.tags);
    if (continent) {
      tags = data.tags.filter(tag => tag.continent === continent);
    } else {
      tags = data.tags;
    }
  }
</script>

<PageLanding center src="/images/destinations.jpg">
  <h1 class="text-3xl tracking-wider uppercase">Destinations</h1>
</PageLanding>

<div class="relative my-8">
  <img src="/images/map.png" alt="World Map" />

  {#each data.markers as marker}
    <Marker {...marker} />
  {/each}
</div>

<hr class="mx-8 dark:border-neutral-600 border-neutral-300">

<div class="mt-8 flex justify-center items-center gap-8">
  <button
    on:click={() => sortByContinent("")}
    class="uppercase text-sm font-semibold"
  >All Destinations</button>
  <button
    on:click={() => sortByContinent("asia")}
    class="uppercase text-sm font-semibold"
  >Asia</button>
  <button
    on:click={() => sortByContinent("africa")}
    class="uppercase text-sm font-semibold"
  >Africa</button>
  <button
    on:click={() => sortByContinent("europe")}
    class="uppercase text-sm font-semibold"
  >Europe</button>
  <button
    on:click={() => sortByContinent("america")}
    class="uppercase text-sm font-semibold"
  >America</button>
  <button
    on:click={() => sortByContinent("middle-east")}
    class="uppercase text-sm font-semibold"
  >Middle East</button>
</div>

<div class="grid grid-cols-4 gap-0.5 p-sm">
  {#each tags as tag (tag.slug)}
    <a href="/destinations/{tag.slug}" class="flex flex-col gap-4 text-sm uppercase font-semibold text-light dark:text-neutral-200 group text-center relative" transition:fade>
      <div
        class="group-hover:brightness-75 brightness-100 duration-300 w-full h-80 bg-cover bg-center rounded-sm"
        style:background-image="url('{tag.image}')"
      />
      <h1 class="absolute bottom-8 text-white left-8">{tag.name}</h1>
    </a>
  {/each}
</div>
