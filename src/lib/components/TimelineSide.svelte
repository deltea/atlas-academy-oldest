<script lang="ts">
  import type { PostData } from "$lib/firebase";
  import { formatDate, getImage } from "$lib/utils";

  export let side: "left" | "right";
  export let posts: PostData[];
</script>

<div class="flex flex-col gap-16 w-1/2 {side === "left" ? "mt-[40px]" : "mt-[calc(40px+6rem)]"}">
  {#each posts as post}
    <a href="/post/{post.slug}" class="flex flex-col {side === "left" ? "items-end" : "items-start"} group gap-2 relative px-16">
      <div class:text-right={side === "left"}>
        <h1 class="font-semibold dark:group-hover:text-white group-hover:text-normal text-neutral-400 duration-300">{formatDate(post.date, "sm")}</h1>
        <h2 class="dark:group-hover:text-white group-hover:text-normal text-neutral-400 duration-300 -mt-0.5 lg:block hidden">
          {post.title}
        </h2>
      </div>

      <img src="{getImage(post.cover, "sm")}" alt="{post.title}" class="h-20 w-auto group-hover:brightness-100 brightness-75 group-hover:scale-105 duration-200 rounded-lg">

      <div class="absolute w-12 border dark:border-neutral-500 border-neutral-300 dark:group-hover:border-white group-hover:border-normal duration-300 {side === "left" ? "right-0" : "left-0"} top-3"></div>

      <div class="absolute w-2 h-2 border-2 dark:border-neutral-500 border-neutral-300 dark:group-hover:border-white group-hover:border-normal duration-300 dark:bg-normal bg-white z-10 top-2 rotate-45 {side === "left" ? "-right-1" : "-left-1"}"></div>
    </a>
  {/each}
</div>
