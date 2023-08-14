<script lang="ts">
  import type { LayoutData } from "./$types";
  import NavBar from "$lib/components/NavBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

  import IconUp from "~icons/gg/chevron-up";

  export let data: LayoutData;

  let atTopOfPage = true;

  function goToTop() {
    window.scrollTo(0, 0);
  }

  function checkTopOfPage() {
    atTopOfPage = window.scrollY === 0;
  }

  onMount(() => {
    checkTopOfPage();

    document.addEventListener("scroll", checkTopOfPage);
    () => document.removeEventListener("scroll", checkTopOfPage);
  });
</script>

<NavBar isAdmin={data.isAdmin} />

<div class="bg-white dark:bg-normal text-normal dark:text-white duration-300">
  <slot />
  {#if !atTopOfPage}
    <button
      class="fixed bottom-8 right-8 dark:bg-neutral-700 bg-neutral-500 text-white rounded-full p-4 shadow-lg"
      on:click={goToTop}
      transition:fly={{ y: 84, duration: 300, opacity: 1 }}
    >
      <IconUp />
    </button>
  {/if}
</div>

<Footer />
