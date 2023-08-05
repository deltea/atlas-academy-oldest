<script lang="ts">
	import PostCard from './PostCard.svelte';
  import type { PostData } from "$lib/firebase";

  import IconRight from '~icons/gg/arrow-right';
  import IconLeft from '~icons/gg/arrow-left';

  export let items: PostData[];
  export let header: string;
  export let href: string = "#";

  let scrollContainer: HTMLElement;

  function scroll(amount: number) {
    scrollContainer.scrollLeft += amount;
  }
</script>

<div class="pt-6 px-6 bg-amber-50 flex justify-between">
  <a href={href} class="text-4xl font-bold">{header}</a>
  <div class="flex gap-4">
    <button class="btn btn-outline btn-circle font-black text-xl font-mono" on:click={() => scroll(-500)}>
      <IconLeft />
    </button>
    <button class="btn btn-outline btn-circle font-black text-xl font-mono" on:click={() => scroll(500)}>
      <IconRight />
    </button>
  </div>
</div>

<div
  class="bg-amber-50 overflow-x-auto flex gap-4 p-6 min-h-16 horizontal-scroll scroll-smooth"
  bind:this={scrollContainer}
>
  {#each items as item}
    <PostCard post={item} urlPrefix="/post" />
  {/each}
</div>
