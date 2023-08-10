<script lang="ts">
  import type { PageData } from "./$types";
  import PageLanding from "$lib/components/PageLanding.svelte";

  export let data: PageData;
</script>

<PageLanding center src="https://source.unsplash.com/random">
  <h1 class="text-3xl tracking-wider uppercase">Destinations</h1>
</PageLanding>
