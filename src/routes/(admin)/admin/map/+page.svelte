<script lang="ts">
  import type { PageData } from './$types';
  import { createDoc, type MarkerData } from '$lib/firebase';
  import Marker from '$lib/components/Marker.svelte';

  export let data: PageData;

  let markers: MarkerData[] = data.markers;

  async function addMarker(e: MouseEvent) {
    const image = e.target as HTMLDivElement;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;

    console.log(x, y);

    if (!confirm("Place marker here?")) return;

    const name = prompt("What to call the marker?");
    if (!name) return;

    const description = prompt("A description for the prompt?");
    if (!description) return;

    const tag = prompt("What is the tag?");
    if (!tag) return;

    markers = [...markers, {
      name,
      description,
      tag,
      x,
      y,
    }];

    await createDoc("markers", {
      name,
      description,
      tag,
      x,
      y,
    });
  }
</script>

<div class="relative">
  <button
    on:click={addMarker}
  >
    <img
      src="/map.png"
      alt="World Map"
    />
  </button>

  {#each markers as marker}
    <Marker x={marker.x} y={marker.y} url="/posts?tags={marker.tag}" />
  {/each}
</div>
