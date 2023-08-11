<script lang="ts">
  import type { LayoutData } from "./$types";
  import NavBar from "$lib/components/NavBar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  export let data: LayoutData;
</script>

<NavBar isAdmin={data.isAdmin} />

<div class="bg-white dark:bg-normal text-normal dark:text-white duration-300">
  <slot />
</div>

<Footer />
