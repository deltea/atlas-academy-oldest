<script lang="ts">
  import type { PageData } from "./$types";
	import PageLanding from "$lib/components/PageLanding.svelte";

  export let data: PageData;
</script>

<PageLanding center src="/images/landing.jpg">
  <h2 class="tracking-widest -mt-28">啟程向世界學習</h2>
  <h1 class="text-4xl tracking-wider font-title">世界是学校</h1>
</PageLanding>

<main class="p-sm">
  <section class="flex items-stretch gap-8">
    <div class="flex flex-col w-full gap-4">
      <div class="bg-[url(/images/home1.jpg)] rounded-md w-full h-1/2 bg-cover bg-center"></div>
      <div class="bg-[url(/images/home2.jpg)] rounded-md w-full h-1/2 bg-cover bg-center"></div>
    </div>

    <div>
      <h1 class="font-bold text-2xl text-white mb-12">如果有一天，有人問你，你可以居住在世界上任何一個地方，你想住哪裡，你會怎麼回答？</h1>

      <div class="grid gap-4">
        <p>在疫情期間，我們一家生活和工作都移至線上，對生活的方式和態度也有很大的改變，想要跳脫本來一成不變的生活，打破我們遵循了好多年的社會規範，把視野放向世界，做個地球公民，於是我們有了一個大膽的想法 -</p>
        <p>環。遊。世。界。</p>
        <p>把一個家，連根拔起，收進一個行李裡，帶著兩個孩子，花兩年時間到世界各地過著遊牧生活，在每一個城市花時間築巢， 在當地的市場買東西，適應不同的氣候，接觸不同的文化和語言，這聽起來浪漫無比的想法，對我們來說，是一場冒險和挑戰，相信會換來我們一輩子難忘的回憶及經歷。</p>
        <p>世界是學校，跟我們一起 World Schooling!</p>
      </div>
    </div>
  </section>
</main>
