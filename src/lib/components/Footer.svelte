<script lang="ts">
  import IconSpotify from "~icons/mdi/spotify";
  import IconApplePodcast from "~icons/simple-icons/applepodcasts";
  import IconFacebook from "~icons/mdi/facebook";
  import IconSvelte from "~icons/simple-icons/svelte";
</script>

<div class="bg-[url(/images/waves.svg)] dark:bg-[url(/images/dark-waves.svg)] bg-white dark:bg-normal bg-cover bg-[center_bottom] bg-no-repeat w-full h-24 duration-300 -my-0.5"></div>

<footer class="bg-[#ececec] dark:bg-[#434343] p-sm text-neutral-700 dark:text-white duration-300">
  <div class="flex justify-between">
    <div class="space-y-2 w-80 gap-1">
      <a
        href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
        target="_blank"
        class="py-2 px-2.5 rounded-md flex items-center btn btn-neutral bg-normal dark:bg-neutral-600 text-left w-full justify-start h-fit hover:bg-neutral-600 dark:hover:bg-neutral-500 border-0"
      >
        <IconApplePodcast class="text-purple-500 bg-white rounded-xl text-3xl" />
        <div class="flex flex-col">
          <small class="text-xs -mb-0.5">Listen on</small>
          <h1 class="text-base -mt-0.5 normal-case">Apple Podcasts</h1>
        </div>
      </a>
      <a
        href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
        target="_blank"
        class="py-2 px-2.5 rounded-md flex items-center btn btn-neutral bg-normal dark:bg-neutral-600 text-left w-full justify-start h-fit hover:bg-neutral-600 dark:hover:bg-neutral-500 border-0"
      >
        <IconSpotify class="text-green-500 text-3xl" />
        <div class="flex flex-col">
          <small class="text-xs -mb-0.5">Listen on</small>
          <h1 class="text-base -mt-0.5 normal-case">Spotify</h1>
        </div>
      </a>
    </div>

    <div class="space-x-16 text-right inline-flex">
      <div class="space-y-6">
        <h2 class="uppercase font-semibold tracking-wider text-sm">
          Pages
        </h2>

        <div class="space-y-1 grid text-sm">
          <a href="/">Home</a>
          <a href="/destinations">Destinations</a>
          <a href="/posts">Blog</a>
          <a href="/about">About Us</a>
        </div>
      </div>
      <div class="space-y-6">
        <h2 class="uppercase font-semibold tracking-wider text-sm">
          Top Destinations
        </h2>

        <div class="space-y-1 grid text-sm">
          <a href="/destinations/italy">Italy</a>
          <a href="/destinations/japan">Japan</a>
          <a href="/destinations/montenegro">Mongenetro</a>
          <a href="/destinations/france">France</a>
        </div>
      </div>
    </div>
  </div>

  <hr class="my-8 dark:border-neutral-600 border-neutral-300">

  <div class="flex justify-between">
    <p class="font-light">© 2023 Atlas Academy. All rights reserved</p>
    <div class="flex gap-2">
      <a
        href="https://www.facebook.com/worldschool.atlas.academy"
        target="_blank"
        class="hover:text-neutral-400 duration-200"
        aria-label="Facebook"
      >
        <IconFacebook />
      </a>
      <a
        href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
        target="_blank"
        class="hover:text-neutral-400 duration-200"
        aria-label="Spotify"
      >
        <IconSpotify />
      </a>
      <a
        href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
        target="_blank"
        class="text-[16px] hover:text-neutral-400 duration-200"
        aria-label="Apple Podcast"
      >
        <IconApplePodcast />
      </a>
    </div>
  </div>
</footer>

<section class="bg-black text-white p-1 flex justify-center">
  <small class="inline-flex items-center gap-1 font-mono">
    Made by
    <a href="https://github.com/thcheetah777" target="_blank" class="underline font-mono">Leo</a>
    with
    <a
      href="https://svelte.dev"
      target="_blank"
      class="underline hover:text-orange-500"
      aria-label="SvelteKit"
    ><IconSvelte /></a>
  </small>
</section>
