<script lang="ts">
	import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { quadInOut } from "svelte/easing";

  import IconSpotify from "~icons/mdi/spotify";
  import IconApplePodcast from "~icons/simple-icons/applepodcasts";
  import IconFacebook from "~icons/mdi/facebook";
  import IconMenu from "~icons/ic/outline-menu";
  import IconMoon from "~icons/ri/moon-fill";
  import IconSun from "~icons/ri/sun-fill";
  import IconAdd from "~icons/gg/add";
  import IconClose from "~icons/gg/close";

  export let isAdmin: boolean;

  let atTopOfPage = true;
  let scrolledScreenHeight = false;
  let scrollDirection: "up" | "down" = "up";
  let darkMode: boolean;
  let navModalOpen = false;

  function checkTopOfPage() {
    scrolledScreenHeight = window.scrollY > window.innerHeight;
    atTopOfPage = window.scrollY === 0;
  }

  function detectScrollDirection(e: WheelEvent) {
    // scrollDirection = e.deltaY < 0 ? "up" : "down";
  }

  function switchDarkMode() {
    darkMode = !darkMode;

    localStorage.setItem("theme", darkMode ? "dark" : "light");

    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }

  onMount(() => {
    checkTopOfPage();

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      darkMode = true;
    } else {
      document.documentElement.classList.remove("dark");
      darkMode = false;
    }

    document.addEventListener("scroll", checkTopOfPage);
    document.addEventListener("wheel", detectScrollDirection);

    return () => {
      document.removeEventListener("scroll", checkTopOfPage);
      document.removeEventListener("wheel", detectScrollDirection);
    }
  });
</script>

<header
  style:top={(scrolledScreenHeight && scrollDirection === "down") ? "-7em" : "0"}
  class="fixed z-50 top-0 w-full flex justify-between items-center px-8 text-xs duration-500 h-navbar
    {atTopOfPage ?
      "text-white bg-transparent lg:h-[100px]" :
      "text-normal bg-white dark:bg-normal dark:text-white shadow-lg"
    }
  "
>
  <div class="flex gap-2 items-center">
    <a href="/" class="{atTopOfPage ? "text-3xl" : "text-2xl"} duration-100 font-normal font-title">
      世界是学校
    </a>

    {#if isAdmin}
      <a href="/admin" class="btn btn-outline btn-xs dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-normal">Admin</a>
    {/if}
  </div>

  <nav class="uppercase hidden tracking-widest font-semibold lg:inline-flex items-center">
    <a
      href="/"
      class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200 py-8 px-4"
    >
      Home
    </a>
    <div class="relative inline-block group py-8 px-4">
      <a
        href="/destinations"
        class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200"
      >
        Destinations
      </a>

      <div class="hidden absolute shadow-lg w-60 p-4 z-20 group-hover:flex flex-col bg-white dark:bg-normal text-normal dark:text-white top-16 font-normal tracking-normal">
        <a
          href="/destinations/italy"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          <span class="font-bold">義大利</span> Italy
        </a>
        <a
          href="/destinations/japan"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          <span class="font-bold">日本</span> Japan
        </a>
        <a
          href="/destinations/montenegro"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          <span class="font-bold">黑山共和國</span> Montenegro
        </a>
        <a
          href="/destinations/france"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          <span class="font-bold">法國</span> France
        </a>
        <a
          href="/destinations/thailand"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          <span class="font-bold">泰國</span> Thailand
        </a>
        <a
          href="/destinations/turkey"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          <span class="font-bold">土耳其</span> Turkey
        </a>
        <a
          href="/destinations/portugal"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          <span class="font-bold">葡萄牙</span> Portugal
        </a>
        <a
          href="/destinations/uae"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          <span class="font-bold">阿聯酋</span> U.A.E
        </a>
        <a href="/destinations" class="p-2 w-full inline-flex gap-2 text-blue-500 hover:bg-neutral-100 hover:text-blue-400 dark:hover:bg-neutral-700 duration-200">
          <IconAdd />
          更多地方
        </a>
      </div>
    </div>
    <a
      href="/posts"
      class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200 py-8 px-4"
    >
      Blog
    </a>
    <a
      href="/timeline"
      class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200 py-8 px-4"
    >
      Timeline
    </a>
    <a
      href="/gallery"
      class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200 py-8 px-4"
    >
      Gallery
    </a>
    <a
      href="/about"
      class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200 py-8 px-4"
    >
      About
    </a>

    <button class="text-lg duration-300 {darkMode ? "rotate-0" : "rotate-45"} ml-4" on:click={switchDarkMode}>
      {#if darkMode}
        <IconMoon />
      {:else}
        <IconSun />
      {/if}
    </button>
  </nav>

  <div class="hidden lg:inline-flex text-lg gap-16 items-center">
    <div class="flex gap-4 items-center">
      <a
        href="https://www.facebook.com/worldschool.atlas.academy"
        target="_blank"
        class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200"
      >
        <IconFacebook />
      </a>
      <a
        href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
        target="_blank"
        class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200"
      >
        <IconSpotify />
      </a>
      <a
        href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
        target="_blank"
        class="text-[16px] hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200"
      >
        <IconApplePodcast />
      </a>
    </div>
  </div>

  <button
    class="inline-flex lg:hidden text-2xl"
    name="Menu"
    on:click={() => navModalOpen = !navModalOpen}
  >
    {#if navModalOpen}
      <IconClose />
    {:else}
      <IconMenu />
    {/if}
  </button>
</header>

{#if navModalOpen}
  <nav class="bg-white text-normal dark:bg-normal dark:text-white duration-300 h-[calc(100vh-80px)] w-screen fixed z-50 bottom-0 flex flex-col justify-center items-center gap-16" transition:slide={{ easing: quadInOut }}>
    <div class="flex flex-col text-center">
      <a class="uppercase font-semibold tracking-widest text-lg" href="/">Home</a>
      <a class="uppercase font-semibold tracking-widest text-lg" href="/destinations">Destinations</a>
      <a class="uppercase font-semibold tracking-widest text-lg" href="/posts">Blog</a>
      <a class="uppercase font-semibold tracking-widest text-lg" href="/timeline">Timeline</a>
      <a class="uppercase font-semibold tracking-widest text-lg" href="/gallery">Gallery</a>
      <a class="uppercase font-semibold tracking-widest text-lg" href="/about">About</a>
    </div>

    <div class="flex gap-4 items-center">
      <a
        href="https://www.facebook.com/worldschool.atlas.academy"
        target="_blank"
        class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200"
      >
        <IconFacebook />
      </a>
      <a
        href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
        target="_blank"
        class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200"
      >
        <IconSpotify />
      </a>
      <a
        href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
        target="_blank"
        class="text-[16px] hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200"
      >
        <IconApplePodcast />
      </a>
    </div>

    <button class="text-lg duration-300 uppercase font-semibold tracking-widest ml-4 inline-flex items-center" on:click={switchDarkMode}>
      <span class="mr-2">Dark mode:</span>
      {#if darkMode}
        <span class="mr-2">On</span><IconMoon />
      {:else}
        <span class="mr-2">Off</span><IconSun />
      {/if}
    </button>
  </nav>
{/if}
