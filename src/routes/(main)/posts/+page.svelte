<script lang="ts">
	import PageLanding from "$lib/components/PageLanding.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<PageLanding center src="https://source.unsplash.com/random">
  <h1 class="text-3xl tracking-wider uppercase">Blog</h1>
</PageLanding>

<div class="p-sm">
  <main class="grid grid-cols-4 gap-4">
    {#each data.posts as post}
      <a href="/post/{post.slug}" class="flex flex-col gap-4 text-sm uppercase text-center font-semibold text-light group">
        <div
          class="group-hover:brightness-75 brightness-100 duration-300 w-full h-40 bg-cover bg-center"
          style:background-image="url('{post.cover}')"
        />
        <h1>{post.title}</h1>
      </a>
    {/each}
  </main>
</div>
