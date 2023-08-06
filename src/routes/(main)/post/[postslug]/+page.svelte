<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils';
  import { onMount } from 'svelte';

  import IconApplePodcast from '~icons/simple-icons/applepodcasts';
  import IconSpotify from '~icons/mdi/spotify';

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

    updateSection();

    document.addEventListener("scroll", updateSection);

    () => document.removeEventListener("scroll", updateSection);
  });
</script>

<div class="w-full grid gap-4 bg-amber-50 p-8">
  <h1 class="text-5xl font-bold">{data.post.title}</h1>
  <div class="flex gap-2 items-center">
    <p class="italic">{formatDate(data.post.date)}</p>
    {#each data.post.tags as tag}
      <a data-sveltekit-reload href="/posts?tags={tag}" class="btn btn-xs normal-case btn-outline">#{tag}</a>
    {/each}
  </div>
  <p class="font-medium italic">{data.post.description}</p>
</div>
<div class="flex justify-between">
  <main class="mx-8 my-4 w-4/6 relative" bind:this={content}>
    {@html data.post.body}
  </main>
  <aside class="w-2/6 sticky top-0 h-screen flex gap-2 p-2 justify-between">
    <div class="border-neutral rounded-xl flex-grow flex flex-col items-center justify-between p-2">
      <div class="flex flex-col gap-4 border border-neutral px-16 py-6 rounded-xl">
        <h1 class="font-bold text-3xl">Recent posts</h1>
        <ul class="list-disc">
          {#each data.recentPosts as post}
            <li class="text-lg hover:underline">
              <a href="/post/{post.slug}">{post.title}</a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="flex flex-col w-full gap-1">
        <a
          href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
          target="_blank"
          class="py-2 px-2.5 rounded-xl flex items-center btn btn-neutral text-left w-full justify-start h-fit"
        >
          <IconApplePodcast class="text-purple-500 bg-white rounded-xl text-4xl" />
          <div class="flex flex-col">
            <small class="-mb-0.5">Listen on</small>
            <h3 class="text-xl -mt-0.5 normal-case">Apple Podcasts</h3>
          </div>
        </a>
        <a
          href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
          target="_blank"
          class="py-2 px-2.5 rounded-xl flex items-center btn btn-neutral text-left w-full justify-start h-fit"
        >
          <IconSpotify class="text-green-500 text-4xl" />
          <div class="flex flex-col">
            <small class="-mb-0.5">Listen on</small>
            <h3 class="text-xl -mt-0.5 normal-case">Spotify</h3>
          </div>
        </a>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      {#if data.post.type === "blog"}
        {#each sections as section}
          <a href="#{section.name.toLowerCase()}" style="height: {section.height}%;" class="flex items-center gap-2 group">
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
          </a>
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
    @apply font-semibold text-4xl my-8;
  }
  main :global(figure) {
    @apply my-8 w-full text-center;
  }
  main :global(figcaption) {
    @apply text-neutral-400 mt-1 italic;
  }
  main :global(p) {
    @apply my-4;
  }
  main :global(img) {
    @apply rounded-md w-full;
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
