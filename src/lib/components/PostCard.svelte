<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PostType } from "$lib/firebase";

  export let url: string;
  export let title: string;
  export let cover: string;
  export let type: PostType;
</script>

<a href={url} class="flex flex-col gap-4 text-sm uppercase font-semibold text-light dark:text-neutral-200 group" transition:fade>
  <div
    class="group-hover:brightness-75 brightness-100 duration-300 w-full h-40 bg-cover bg-center relative"
    style:background-image="url('{cover}')"
  ></div>

  <div class="inline-flex items-center gap-2">
    <h1>{title}</h1>
  </div>
</a>
