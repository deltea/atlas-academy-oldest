<script lang="ts">
	import PageLanding from "$lib/components/PageLanding.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<PageLanding center src="/images/about.jpg">
  <h1 class="text-3xl tracking-wider uppercase">About Us</h1>
</PageLanding>

<main class="p-sm">
  <h1 class="font-bold text-xl">如果有一天，有人問你，你可以居住在世界上任何一個地方，你想住哪裡，你會怎麼回答？</h1>

  <p class="mt-8">
    在疫情期間，我們一家生活和工作都移至線上，對生活的方式和態度也有很大的改變，想要跳脫本來一成不變的生活，打破我們遵循了好多年的社會規範，把視野放向世界，做個地球公民，於是我們有了一個大膽的想法 -

    環。遊。世。界。

    把一個家，連根拔起，收進一個行李裡，帶著兩個孩子，花兩年時間到世界各地過著遊牧生活，在每一個城市花時間築巢， 在當地的市場買東西，適應不同的氣候，接觸不同的文化和語言，這聽起來浪漫無比的想法，對我們來說，是一場冒險和挑戰，相信會換來我們一輩子難忘的回憶及經歷。
  </p>
</main>
