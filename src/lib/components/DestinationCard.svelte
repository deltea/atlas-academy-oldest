<script lang="ts">
  import { fade } from "svelte/transition";

  export let slug: string;
  export let image: string;
  export let name: string;
</script>

<a href="/destinations/{slug}" class="flex flex-col gap-4 text-sm uppercase font-semibold text-light dark:text-neutral-200 group text-center" transition:fade>
  <div
    class="group-hover:brightness-75 brightness-100 duration-300 w-full h-80 bg-cover bg-center rounded-sm"
    style:background-image="url('{image}')"
  />
  <h1>{name}</h1>
</a>
