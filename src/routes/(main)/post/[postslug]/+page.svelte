<script lang="ts">
  import { formatDate } from '$lib/utils';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  interface Section {
    name: string,
    position: number,
    bottom: number,
    height: number,
  }

  export let data: PageData;
  let sections: Section[] = [];
  let content: HTMLElement;
  let height: number = 0;
  let scrollPercent: number;

  function updateSection() {
    scrollPercent = (window.scrollY - content.offsetTop + window.innerHeight) / height * 100;
    console.log(scrollPercent, content.offsetTop);
  }

  function scrollSectionIntoView(sectionId: string) {
    const target = document.getElementById(sectionId);
    target?.scrollIntoView({ block: "start" });
  }

  onMount(() => {
    const headers = content.getElementsByTagName("h1");

    height = content.offsetHeight;

    for (let i = 0; i < headers.length; i++) {
      const element = headers[i];
      element.id = element.innerText.toLowerCase();
      sections = [...sections, {
        name: element.innerText,
        position: element.offsetTop / height * 100,
        bottom: (headers[i + 1] ? headers[i + 1].offsetTop : height) / height * 100,
        height: (
          headers[i + 1] ?
          headers[i + 1].offsetTop - element.offsetTop :
          height - element.offsetTop
        ) / height * 100
      }];
    }

    document.addEventListener("scroll", updateSection);

    () => document.removeEventListener("scroll", updateSection);
  });
</script>

<div class="bg-cover bg-center w-full h-80" style="background-image: url('{data.post.cover}');"></div>

<div class="w-full flex flex-col items-center gap-4 bg-amber-50 px-28 py-8">
  <h1 class="text-2xl font-bold uppercase tracking-wider">{data.post.title}</h1>
  <p class="mr-2">{formatDate(data.post.date)}</p>
  <div class="flex gap-1 items-center">
    {#each data.post.tags as tag}
      <a data-sveltekit-reload href="/posts?tags={tag}" class="btn btn-xs normal-case btn-outline">#{tag}</a>
    {/each}
  </div>
  <p class="italic pr-12 text-center">{data.post.description}</p>
</div>

<div class="flex justify-between gap-2">
  <main class="ml-28 my-8 w-3/5 relative" bind:this={content}>
    {@html data.post.body}
  </main>

  <aside class="w-2/5 sticky top-0 h-screen flex p-2 justify-between">
    <div class="flex-grow flex flex-col items-start justify-between p-2">
      <div class="flex flex-col gap-4 border border-neutral px-12 py-6 rounded-xl">
        <h1 class="font-bold text-lg tracking-widest">RECENT POSTS</h1>
        <ul class="list-disc">
          {#each data.recentPosts as post}
            <li class=" hover:underline">
              <a href="/post/{post.slug}">{post.title}</a>
            </li>
          {/each}
        </ul>
      </div>

      {#if data.post.podcast.length > 0}
        <div class="flex flex-col gap-2">
          {#each data.post.podcast as episode}
            <iframe
              title="Spotify Player"
              class="rounded-2xl w-full h-20"
              src="https://open.spotify.com/embed{episode.match(/\/episode\/([^\/?]+)/g)}?theme=0&utm_source=generator"
              frameBorder="0"
              allowfullscreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          {/each}
        </div>
      {/if}
    </div>

    <div class="flex flex-col gap-2">
      {#if data.post.type === "blog"}
        {#each sections as section}
          <button
            style="height: {section.height}%;"
            class="flex items-center gap-2 group"
            on:click|preventDefault={() => scrollSectionIntoView(section.name.toLowerCase())}
          >
            <p
              class="vertical-text font-thin text-neutral-300 group-hover:text-neutral duration-300"
              style:color={
                scrollPercent > section.position && scrollPercent < section.bottom ? "#2a323c" : null
              }
            >{section.name.toUpperCase()}</p>
            <div
              class="border border-neutral rounded-md w-3 h-full duration-200 group-hover:bg-neutral"
              style:background-color={scrollPercent > section.position && scrollPercent < section.bottom ? "#2a323c" : null}
            ></div>
            </button>
        {/each}
      {/if}
    </div>
  </aside>
</div>

<style>
  .vertical-text {
    writing-mode: vertical-lr;
    text-orientation: upright;
    letter-spacing: 2px;
  }
  main :global(h1) {
    @apply text-2xl my-8;
  }
  main :global(figure) {
    @apply my-8 w-full text-center;
  }
  main :global(figcaption) {
    @apply text-neutral-400 mt-1 italic;
  }
  main :global(p) {
    @apply my-4 text-justify;
  }
  main :global(img) {
    @apply rounded-box w-full;
  }
  main :global(ol) {
    @apply list-decimal;
  }
  main :global(ul) {
    @apply list-disc;
  }
  main :global(a) {
    @apply underline;
  }
</style>
