<script lang="ts">
	import PageLanding from "$lib/components/PageLanding.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<PageLanding center src="https://www.londonxlondon.com/wp-content/uploads/2020/09/Marylebone-69.jpg">
  <h1 class="text-3xl tracking-wider uppercase">Gallery</h1>
</PageLanding>
