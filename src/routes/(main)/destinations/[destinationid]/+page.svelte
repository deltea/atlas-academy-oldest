<script lang="ts">
	import PageLanding from "$lib/components/PageLanding.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<PageLanding src={data.tag.image}>
  <h1 class="text-3xl tracking-wider uppercase">{data.tag.name}</h1>
</PageLanding>

<div class="p-sm">
  <div class="flex flex-col gap-4 mt-20 mb-4">
    <h3 class="tracking-widest font-semibold text-light dark:text-neutral-200">{data.tag.name.toLowerCase()}</h3>
    <hr class="w-12 border-blue-500 border-sm">
  </div>

  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-semibold uppercase">{data.tag.heading}</h1>
    <p class="text-light dark:text-neutral-200">{data.tag.description}</p>
  </div>

  <div class="flex flex-col gap-4 mt-20 mb-8">
    <h3 class="tracking-widest font-semibold text-light dark:text-neutral-200">all posts</h3>
    <hr class="w-12 border-blue-500 border-sm">
  </div>

  <main class="grid grid-cols-4 gap-4">
    {#each data.posts as post}
      <a href="/post/{post.slug}" class="flex flex-col gap-4 text-sm uppercase font-semibold text-light dark:text-neutral-200 group">
        <div
          class="group-hover:brightness-75 brightness-100 duration-300 w-full h-40 bg-cover bg-center"
          style:background-image="url('{post.cover}')"
        />
        <h1>{post.title}</h1>
      </a>
    {/each}
  </main>
</div>
