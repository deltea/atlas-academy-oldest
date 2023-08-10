<script lang="ts">
	import PageLanding from "$lib/components/PageLanding.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<PageLanding center src="">
  <h1 class="text-3xl tracking-wider uppercase">About Us</h1>
</PageLanding>
