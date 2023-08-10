<script lang="ts">
  import NavBar from "$lib/components/NavBar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  import { onMount } from "svelte";
  import { loadDarkMode } from "$lib/utils";

  onMount(() => {
    loadDarkMode();
  });
</script>

<NavBar />

<div class="bg-white dark:bg-normal text-normal dark:text-white duration-300">
  <slot />
</div>

<Footer />
