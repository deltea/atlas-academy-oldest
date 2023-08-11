<script lang="ts">
	import { draw, fade, scale, slide } from "svelte/transition";

  export let url: string;
  export let title: string;
  export let cover: string;
</script>

<a href={url} class="flex flex-col gap-4 text-sm uppercase font-semibold text-light dark:text-neutral-200 group" transition:fade>
  <div
    class="group-hover:brightness-75 brightness-100 duration-300 w-full h-40 bg-cover bg-center rounded-sm"
    style:background-image="url('{cover}')"
  />
  <h1>{title}</h1>
</a>
