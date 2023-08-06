<script lang="ts">
  import { scale } from "svelte/transition";

  export let x: number;
  export let y: number;
</script>

<div
  class="w-2 h-2 absolute bg-red-500 z-10 rounded-full pointer-events-none"
  style:left="calc({x}% - 4px)"
  style:top="calc({y}% - 4px)"
  transition:scale={{ duration: 200 }}
/>
