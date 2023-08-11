<script lang="ts">
  import { onMount } from "svelte";

  import IconSpotify from "~icons/mdi/spotify";
  import IconApplePodcast from "~icons/simple-icons/applepodcasts";
  import IconFacebook from "~icons/mdi/facebook";
  import IconMenu from "~icons/ic/outline-menu";
  import IconMoon from "~icons/ri/moon-fill";
  import IconSun from "~icons/ri/sun-fill";
  import IconAdd from "~icons/gg/add";

  export let isAdmin: boolean;

  let atTopOfPage = true;
  let scrolledScreenHeight = false;
  let scrollDirection: "up" | "down" = "up";
  let darkModeSwitch: HTMLButtonElement;
  let darkMode: boolean;

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
    darkModeSwitch.addEventListener("click", switchDarkMode);

    return () => {
      document.removeEventListener("scroll", checkTopOfPage);
      document.removeEventListener("wheel", detectScrollDirection);
      darkModeSwitch.addEventListener("click", () => switchDarkMode);
    }
  });
</script>

<header
  style:top={(scrolledScreenHeight && scrollDirection === "down") ? "-7em" : "0"}
  class="fixed z-20 top-0 w-full flex justify-between items-center px-sm text-xs duration-500
    {atTopOfPage ?
      "text-white bg-transparent h-[15vh]" :
      "text-normal bg-white dark:bg-normal dark:text-white h-[12vh] shadow-lg"
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

  <nav class="uppercase hidden tracking-widest font-semibold md:inline-flex items-center">
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
          Italy
        </a>
        <a
          href="/destinations/japan"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          Japan
        </a>
        <a
          href="/destinations/montenegro"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          Montenegro
        </a>
        <a
          href="/destinations/france"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 duration-200">
          France
        </a>
        <a href="/destinations" class="p-2 w-full inline-flex gap-2 text-blue-500 hover:bg-neutral-100 hover:text-blue-400 dark:hover:bg-neutral-700 duration-200">
          <IconAdd />
          跟多地方
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
      href="/about"
      class="hover:{atTopOfPage ? "text-neutral-200" : "text-neutral-400"} duration-200 py-8 px-4"
    >
      About
    </a>

    <button class="text-lg duration-300 {darkMode ? "rotate-0" : "rotate-45"} ml-4" bind:this={darkModeSwitch}>
      {#if darkMode}
        <IconMoon />
      {:else}
        <IconSun />
      {/if}
    </button>
  </nav>

  <div class="hidden md:inline-flex text-lg gap-16 items-center">
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

  <button class="inline-flex md:hidden text-2xl"><IconMenu /></button>
</header>
