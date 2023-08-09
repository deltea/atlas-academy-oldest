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
    scrollDirection = e.deltaY < 0 ? "up" : "down";
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
  class="fixed top-0 w-full flex justify-between items-center px-sm text-sm duration-500
    {atTopOfPage ?
      "text-white bg-transparent h-[15vh]" :
      "text-normal bg-white h-[12vh] shadow-lg"
    } {
      scrolledScreenHeight && scrollDirection === "down" ?
      "-top-24" :
      "top-0"
    }
  "
>
  <a href="/" class="text-2xl">世界是学校</a>

  <nav class="uppercase inline-flex gap-sm tracking-widest font-bold">
    <a href="/">Home</a>
    <a href="/">Destinations</a>
    <a href="/">Blog</a>
    <a href="/">About</a>
  </nav>

  <div class="inline-flex gap-4 text-lg items-center">
    <a href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3" class="">
      <IconFacebook />
    </a>
    <a href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3" class="">
      <IconSpotify />
    </a>
    <a href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3" class="text-[16px]">
      <IconApplePodcast />
    </a>
  </div>
</header>
