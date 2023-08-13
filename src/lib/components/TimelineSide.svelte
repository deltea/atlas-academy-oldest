<script lang="ts">
  import type { PostData } from "$lib/firebase";

  export let side: "left" | "right";
  export let posts: PostData[];
</script>

<div class="flex flex-col gap-16 w-1/2 p-16 pt-24 relative {side === "left" ? "top-[68px]" : "float-right"}">
  {#each posts as post}
    <a href="/post/{post.slug}" class="flex flex-col {side === "left" ? "items-end" : "items-start"} group gap-2">
      <div class:text-right={side === "left"}>
        <h1 class="font-semibold dark:group-hover:text-white group-hover:text-normal text-neutral-400 duration-300">{post.date}</h1>
        <h2 class="dark:group-hover:text-white group-hover:text-normal text-neutral-400 duration-300 -mt-0.5">{post.title}</h2>
      </div>

      <img src="{post.cover}" alt="{post.title}" class="h-20 group-hover:brightness-100 brightness-75 group-hover:scale-105 duration-200 rounded-lg">

      <div class="absolute w-12 border dark:border-neutral-500 border-neutral-300 dark:group-hover:border-white group-hover:border-normal duration-300 {side === "left" ? "right-0" : "left-0"} translate-y-3"></div>

      <div class="absolute w-2 h-2 border-2 dark:border-neutral-500 border-neutral-300 dark:group-hover:border-white group-hover:border-normal duration-300 dark:bg-normal bg-white z-10 {side === "left" ? "-right-[3.5px]" : "-left-[3.5px]"} translate-y-[9px] rotate-45"></div>
    </a>
  {/each}
</div>
