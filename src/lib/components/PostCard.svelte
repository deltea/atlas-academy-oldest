<script lang="ts">
  import { fade } from "svelte/transition";
  import type { PostType } from "$lib/firebase";

  import IconPen from "~icons/gg/pen";
  import IconMic from "~icons/material-symbols/mic";

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

  <h1 class="items-center gap-1">
    {title}
    {#if type === "reflection"}
      <small class="inline-flex items-center gap-0.5 text-[10px] rounded-full bg-neutral-600 text-white px-2 justify-center">
        <IconPen class="text-[9px]" />
        城市隨筆
      </small>
    {:else}
      <small class="inline-flex items-center gap-0.5 text-[10px] rounded-full text-neutral-600 dark:bg-white bg-neutral-200 p-[3px] justify-center">
        <IconMic class="text-[11px]" />
      </small>
    {/if}
  </h1>
</a>
