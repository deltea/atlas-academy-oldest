<script lang="ts">
  import type { PageData } from "./$types";
	import PageLanding from "$lib/components/PageLanding.svelte";
  import TimelineSide from "$lib/components/TimelineSide.svelte";

  export let data: PageData;
</script>

<PageLanding center src="/images/timeline.jpg">
  <h1 class="text-3xl tracking-wider uppercase">Timeline</h1>
</PageLanding>

<main class="h-[500vh] flex">
  <TimelineSide side="left" posts={data.leftPosts} />

  <div class="absolute flex flex-col items-center my-8 gap-4 left-1/2 -translate-x-1/2">
    <h1>2022</h1>
    <div class="border dark:border-neutral-500 border-neutral-300 h-[2000px] w-0 relative">
      <div class="absolute w-1.5 h-1.5 rounded-full dark:bg-neutral-500 bg-neutral-300 -top-1 left-1/2 -translate-x-1/2"></div>
      <div class="absolute w-1.5 h-1.5 rounded-full dark:bg-neutral-500 bg-neutral-300 -bottom-1 left-1/2 -translate-x-1/2"></div>
    </div>
    <h1>2023</h1>
    <div class="border dark:border-neutral-500 border-neutral-300 h-40 w-0 relative">
      <div class="absolute w-1.5 h-1.5 rounded-full dark:bg-neutral-500 bg-neutral-300 -top-1 left-1/2 -translate-x-1/2"></div>
      <div class="absolute w-1.5 h-1.5 rounded-full dark:bg-neutral-500 bg-neutral-300 -bottom-1 left-1/2 -translate-x-1/2"></div>
    </div>
    <h1>🔮2024🔮</h1>
  </div>

  <TimelineSide side="right" posts={data.rightPosts} />
</main>
