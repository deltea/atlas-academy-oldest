<script lang="ts">
  import type { LayoutData } from "./$types";
  import NavBar from "$lib/components/NavBar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  import IconUp from "~icons/gg/chevron-up";

  export let data: LayoutData;

  function goToTop() {
    window.scrollTo(0, 0);
  }
</script>

<NavBar isAdmin={data.isAdmin} />

<div class="bg-white dark:bg-normal text-normal dark:text-white duration-300">
  <slot />
  <button
    class="fixed bottom-8 right-8 dark:bg-neutral-700 bg-neutral-500 text-white rounded-full p-4 shadow-lg"
    on:click={goToTop}
  >
    <IconUp />
  </button>
</div>

<Footer />
