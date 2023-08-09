<script lang="ts">
  import { onMount } from "svelte";

  import IconSpotify from "~icons/mdi/spotify";
  import IconApplePodcast from "~icons/simple-icons/applepodcasts";
  import IconFacebook from "~icons/mdi/facebook";

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
  class="fixed z-50 top-0 w-full flex justify-between items-center px-sm text-xs duration-500
    {atTopOfPage ?
      "text-white bg-transparent h-[15vh]" :
      "text-normal bg-white h-[12vh] shadow-lg"
    }"
  style:top={(scrolledScreenHeight && scrollDirection === "down") ? "-7em" : "0"}
>
  <a href="/" class="{atTopOfPage ? "text-2xl" : "text-xl"} duration-100 font-bold">世界是学校</a>

  <nav class="uppercase inline-flex gap-sm tracking-widest font-bold">
    <a href="/">Home</a>
    <a href="/destinations">Destinations</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
  </nav>

  <div class="inline-flex gap-4 text-lg items-center">
    <a href="https://www.facebook.com/worldschool.atlas.academy" target="_blank">
      <IconFacebook />
    </a>
    <a href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3" target="_blank">
      <IconSpotify />
    </a>
    <a href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789" class="text-[16px]" target="_blank">
      <IconApplePodcast />
    </a>
  </div>
</header>
