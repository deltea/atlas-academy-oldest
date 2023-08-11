<script lang="ts">
	import DestinationCard from "$lib/components/DestinationCard.svelte";
  import type { PageData } from "./$types";
  import PageLanding from "$lib/components/PageLanding.svelte";
  import Marker from "$lib/components/Marker.svelte";

  export let data: PageData;
</script>

<PageLanding center src="/images/destinations.jpg">
  <h1 class="text-3xl tracking-wider uppercase">Destinations</h1>
</PageLanding>

<div class="relative m-8">
  <img
    src="/images/map.png"
    alt="World Map"
  />

  {#each data.markers as marker}
    <Marker {...marker} />
  {/each}
</div>

<div class="grid grid-cols-3 gap-2 gap-y-8 p-sm">
  {#each data.tags as tag}
    <DestinationCard {...tag} />
  {/each}
</div>
