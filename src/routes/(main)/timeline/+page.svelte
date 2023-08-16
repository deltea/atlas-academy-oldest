<script lang="ts">
  import type { PageData } from "./$types";
	import PageLanding from "$lib/components/PageLanding.svelte";
  import TimelineSide from "$lib/components/TimelineSide.svelte";
  import type { PostData, PostType } from "$lib/firebase";

  import IconPen from "~icons/gg/pen";
  import IconMic from "~icons/material-symbols/mic";
  import { getImage } from "$lib/utils";

  export let data: PageData;

  let posts = data.posts;
  let postTypes: PostType[] = ["reflection", "blog"];
  let leftPosts: PostData[], rightPosts: PostData[];
  let previousType: PostType;

  $: posts = data.posts.filter(post => postTypes.includes(post.type));
  $: if (postTypes.length === 0) postTypes = [previousType === "blog" ? "reflection" : "blog"];

  $: leftPosts = posts.filter((_, i) => i % 2 === 0);
  $: rightPosts = posts.filter((_, i) => i % 2 !== 0);
</script>

<PageLanding center src={getImage("timeline.webp", "lg", "library")}>
  <h1 class="text-3xl tracking-wider uppercase">Timeline</h1>
</PageLanding>

<div class="sticky top-navbar z-30 h-16 flex justify-start items-center w-full lg:px-12 px-8 -mb-16 mt-8 lg:gap-8 gap-4">
  <div>
    <input
      type="checkbox"
      name="type"
      id="podcast"
      value="blog"
      class=""
      bind:group={postTypes}
      on:click={() => previousType = "blog"}
    />

    <label class="inline-flex items-center gap-1" for="podcast">
      <IconPen class="text-[9px]" />
      <span class="lg:block hidden">Podcasts</span>
    </label>
  </div>

  <div>
    <input
      type="checkbox"
      name="type"
      id="reflection"
      value="reflection"
      class=""
      bind:group={postTypes}
      on:click={() => previousType = "reflection"}
    />

    <label class="inline-flex items-center gap-1" for="reflection">
      <IconMic class="text-[11px]" />
      <span class="lg:block hidden">Reflections</span>
    </label>
  </div>
</div>

<h1 class="sticky top-navbar dark:bg-normal bg-white z-20 w-full h-16 flex lg:justify-center justify-end items-center border-neutral-300 dark:border-neutral-500 px-8 ">2022</h1>

<section class="flex justify-around py-8">
  <TimelineSide side="left" posts={leftPosts} />

  <div class="flex flex-col items-center">
    <div class="border dark:border-neutral-500 border-neutral-300 w-0 flex flex-col justify-between items-center" style:height="{posts.length * 102}px">
      <div class="w-2 h-2 rounded-full dark:bg-neutral-500 bg-neutral-300 -translate-y-1"></div>
      <div class="w-2 h-2 rounded-full dark:bg-neutral-500 bg-neutral-300 translate-y-1"></div>
    </div>
  </div>

  <TimelineSide side="right" posts={rightPosts} />
</section>

<h1 class="sticky top-navbar dark:bg-normal bg-white z-20 w-full h-16 flex lg:justify-center justify-end items-center border-neutral-300 dark:border-neutral-500 px-8 ">2023</h1>

<section class="flex justify-around py-8">
  <TimelineSide side="left" posts={leftPosts} />

  <div class="flex flex-col items-center">
    <div class="border dark:border-neutral-500 border-neutral-300 w-0 flex flex-col justify-between items-center" style:height="{posts.length * 102}px">
      <div class="w-2 h-2 rounded-full dark:bg-neutral-500 bg-neutral-300 -translate-y-1"></div>
      <div class="w-2 h-2 rounded-full dark:bg-neutral-500 bg-neutral-300 translate-y-1"></div>
    </div>
  </div>

  <TimelineSide side="right" posts={rightPosts} />
</section>
