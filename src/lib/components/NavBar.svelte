<script lang="ts">
  import { onMount } from "svelte";

  import IconSpotify from "~icons/mdi/spotify";
  import IconApplePodcast from "~icons/simple-icons/applepodcasts";
  import IconFacebook from "~icons/mdi/facebook";
  import IconMenu from "~icons/ic/outline-menu";

  let atTopOfPage = true;
  let scrolledScreenHeight = false;
  let scrollDirection: "up" | "down" = "up";

  function checkTopOfPage() {
    scrolledScreenHeight = window.scrollY > window.innerHeight;
    atTopOfPage = window.scrollY === 0;
  }

  function detectScrollDirection(e: WheelEvent) {
    // scrollDirection = e.deltaY < 0 ? "up" : "down";
  }

  onMount(() => {
    checkTopOfPage();

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
  class="fixed z-10 top-0 w-full flex justify-between items-center px-sm text-xs duration-500
    {atTopOfPage ?
      "text-white bg-transparent h-[15vh]" :
      "text-normal bg-white h-[12vh] shadow-lg"
    }
  "
>
  <a href="/" class="{atTopOfPage ? "text-2xl" : "text-xl"} duration-100 font-normal text-3xl font-title">
    世界是学校
  </a>

  <nav class="uppercase hidden tracking-widest font-semibold md:inline-flex">
    <a
      href="/"
      class="hover:{atTopOfPage ? "text-neutral-300" : "text-neutral-400"} duration-200 py-8 px-4"
    >
      Home
    </a>
    <div class="relative inline-block group py-8 px-4">
      <a
        href="/destinations"
        class="hover:{atTopOfPage ? "text-neutral-300" : "text-neutral-400"} duration-200"
      >
        Destinations
      </a>

      <div class="hidden absolute shadow-lg w-60 p-4 z-20 group-hover:flex flex-col bg-white text-normal top-16 font-normal tracking-normal">
        <a
          href="/destinations/serbia"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 duration-200">
          Serbia
        </a>
        <a
          href="/destinations/serbia"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 duration-200">
          Serbia
        </a>
        <a
          href="/destinations/serbia"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 duration-200">
          Serbia
        </a>
        <a
          href="/destinations/serbia"
          class="p-2 w-full hover:bg-neutral-100 hover:text-neutral-400 duration-200">
          Serbia
        </a>
      </div>
    </div>
    <a
      href="/posts"
      class="hover:{atTopOfPage ? "text-neutral-300" : "text-neutral-400"} duration-200 py-8 px-4"
    >
      Blog
    </a>
    <a
      href="/about"
      class="hover:{atTopOfPage ? "text-neutral-300" : "text-neutral-400"} duration-200 py-8 px-4"
    >
      About
    </a>
  </nav>

  <div class="hidden md:inline-flex gap-4 text-lg items-center">
    <a
      href="https://www.facebook.com/worldschool.atlas.academy"
      target="_blank"
      class="hover:{atTopOfPage ? "text-neutral-300" : "text-neutral-400"} duration-200"
    >
      <IconFacebook />
    </a>
    <a
      href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
      target="_blank"
      class="hover:{atTopOfPage ? "text-neutral-300" : "text-neutral-400"} duration-200"
    >
      <IconSpotify />
    </a>
    <a
      href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
      target="_blank"
      class="text-[16px] hover:{atTopOfPage ? "text-neutral-300" : "text-neutral-400"} duration-200"
    >
      <IconApplePodcast />
    </a>
  </div>

  <button class="inline-flex md:hidden text-2xl"><IconMenu /></button>
</header>
