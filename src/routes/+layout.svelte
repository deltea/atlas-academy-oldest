<script lang="ts">
  import "../app.css";
  import "../style.css";

	import NavBar from './../lib/components/NavBar.svelte';
</script>

<svelte:head>
  <title>Atlas Academy</title>
</svelte:head>

<main class="h-auto">
  <NavBar />

  <slot />
</main>
