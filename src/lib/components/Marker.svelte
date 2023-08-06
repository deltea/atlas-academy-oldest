<script lang="ts">
  import { scale } from "svelte/transition";

  export let x: number;
  export let y: number;
  export let url: string;
</script>

<!-- svelte-ignore a11y-missing-content -->
<a
  href={url}
  class="w-3 h-3 absolute bg-red-500 z-10 rounded-full hover:scale-150 duration-fast"
  style:left="calc({x}% - 0.75rem)"
  style:top="calc({y}% - 0.75rem)"
  transition:scale={{ duration: 200 }}
></a>
