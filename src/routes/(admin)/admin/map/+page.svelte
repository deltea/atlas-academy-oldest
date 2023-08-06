<script lang="ts">
  import type { PageData } from './$types';
  import { createDoc, type MarkerData } from '$lib/firebase';
  import { scale } from 'svelte/transition';

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

<div class="w-full h-screen">
  <button
    on:click={addMarker}
    class="w-full h-full bg-contain bg-no-repeat bg-[url(/map.png)]"
  >
    {#each markers as marker}
      <div
        class="w-2 h-2 absolute bg-red-500 z-10 rounded-full pointer-events-none"
        style:left="calc({marker.x}% - 4px)"
        style:top="calc({marker.y}% - 4px)"
        transition:scale={{ duration: 200 }}
      />
    {/each}
  </button>
</div>
