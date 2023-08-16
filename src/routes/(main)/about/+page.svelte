<script lang="ts">
	import PageLanding from "$lib/components/PageLanding.svelte";
  import { getImage } from "$lib/utils";
  import type { PageData } from "./$types";

  export let data: PageData;

  const images = [
    { index: 1, caption: "吉隆坡 - Malaysia" },
    { index: 2, caption: "以佛斯 - Turkey" },
    { index: 3, caption: "波隆那 - Italy" },
    { index: 4, caption: "梵諦岡 - Vatican" },
    { index: 5, caption: "塞爾維亞 - Serbia" },
    { index: 6, caption: "格拉斯 - France" },
    { index: 7, caption: "阿布達比 - U.A.E" },
    { index: 8, caption: "里斯本 - Portugal" },
    { index: 9, caption: "京都 - Japan" }
  ]
</script>

<PageLanding center src={getImage("about.webp", "md", "library")}>
  <h1 class="text-3xl tracking-wider uppercase">About Us</h1>
</PageLanding>

<main class="lg:p-sm p-xs">
  <h1>如果有一天，有人問你：「如果你可以居住在世界上任何一個地方，你想住哪裡」，你會怎麼回答？</h1>

  <div>
    <p>在疫情期間，我們一家生活和工作都移至線上，對生活的方式和態度也有很大的改變，想要跳脫本來一成不變的生活，打破我們遵循了好多年的社會規範，把視野放向世界，做個地球公民，於是我們有了一個大膽的想法 -</p>

    <div class="my-4">

    <p>環。遊。世。界。</p>

    <div class="my-4">

    <p>把一個家，連根拔起，收進一個行李，帶著兩個孩子，花兩年時間到世界各地過著遊牧生活，在每一個城市花時間築巢， 在當地的市場買東西，適應不同的氣候，接觸不同的文化和語言，這聽起來浪漫無比的想法，對我們來說，是一場冒險和挑戰，相信會換來我們一輩子難忘的回憶及經歷。</p>
  </div>

  <div class="gap-4 grid lg:grid-cols-3 lg:grid-rows-3 lg:h-[80rem] h-[400vh] mt-12">
    {#each images as image}
      <div
        style:background-image="url('{getImage(`${image.index}.jpg`, "sm", "library")}')"
        class="bg-cover bg-center w-full h-full relative"
      >
        <div class="w-full absolute bottom-0 bg-gradient-to-t dark:from-normal from-neutral-500 h-32"></div>
        <p class="my-2 mx-4 absolute bottom-4 text-white">{image.caption}</p>
      </div>
    {/each}
  </div>
</main>
