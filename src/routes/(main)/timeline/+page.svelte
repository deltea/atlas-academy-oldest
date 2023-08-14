<script lang="ts">
  import type { PageData } from "./$types";
	import PageLanding from "$lib/components/PageLanding.svelte";
  import TimelineSide from "$lib/components/TimelineSide.svelte";
  import type { PostData, PostType } from "$lib/firebase";

  import IconPen from "~icons/gg/pen";
  import IconMic from "~icons/material-symbols/mic";

  export let data: PageData;

  let posts = data.posts;
  let postTypes: PostType[] = ["reflection", "blog"];
  let leftPosts: PostData[], rightPosts: PostData[];

  $: {
    posts = data.posts.filter(post => postTypes.includes(post.type));
  }

  $: leftPosts = posts.filter((_, i) => i % 2 === 0);
  $: rightPosts = posts.filter((_, i) => i % 2 !== 0);
</script>

<PageLanding center src="/images/timeline.jpg">
  <h1 class="text-3xl tracking-wider uppercase">Timeline</h1>
</PageLanding>

<main class="h-[500vh] flex justify-center">
  <TimelineSide side="left" posts={leftPosts} />

  <div class="absolute flex flex-col items-center my-8 gap-8 w-full">
    <div class="sticky top-navbar z-30 h-16 flex justify-start items-center w-full -mb-24 px-8 gap-8">
      <div>
        <input
          type="checkbox"
          name="type"
          id="podcast"
          value="blog"
          class=""
          bind:group={postTypes}
        />

        <label class="inline-flex items-center gap-1" for="podcast">
          <IconPen class="text-[9px]" />
          Podcasts
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
        />

        <label class="inline-flex items-center gap-1" for="reflection">
          <IconMic class="text-[11px]" />
          Reflections
        </label>
      </div>
    </div>

    <h1 class="sticky top-navbar dark:bg-normal bg-white z-20 w-full h-16 flex justify-center items-center border-neutral-300 dark:border-neutral-500">2022</h1>
    <div class="border dark:border-neutral-500 border-neutral-300 h-[2000px] w-0 relative">
      <div class="absolute w-1.5 h-1.5 rounded-full dark:bg-neutral-500 bg-neutral-300 -top-1 left-1/2 -translate-x-1/2"></div>
      <div class="absolute w-1.5 h-1.5 rounded-full dark:bg-neutral-500 bg-neutral-300 -bottom-1 left-1/2 -translate-x-1/2"></div>
    </div>
    <h1 class="sticky top-navbar dark:bg-normal bg-white z-20 w-full h-16 flex justify-center items-center border-neutral-300 dark:border-neutral-500">2023</h1>
    <div class="border dark:border-neutral-500 border-neutral-300 h-40 w-0 relative">
      <div class="absolute w-1.5 h-1.5 rounded-full dark:bg-neutral-500 bg-neutral-300 -top-1 left-1/2 -translate-x-1/2"></div>
      <div class="absolute w-1.5 h-1.5 rounded-full dark:bg-neutral-500 bg-neutral-300 -bottom-1 left-1/2 -translate-x-1/2"></div>
    </div>
    <h1 class="sticky top-navbar dark:bg-normal bg-white z-20 w-full h-16 flex justify-center items-center border-neutral-300 dark:border-neutral-500">🔮2024🔮</h1>
  </div>

  <TimelineSide side="right" posts={rightPosts} />
</main>
