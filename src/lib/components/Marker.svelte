<script lang="ts">
  import { scale } from "svelte/transition";

  import IconMarker from '~icons/majesticons/map-marker';

  export let x: number;
  export let y: number;
  export let name: string;
  export let description: string;
  export let tag: string;
</script>

<a
  href="/destinations/{tag}"
  class="absolute inline-block group"
  style:left="calc({x}% - 0.5rem)"
  style:top="calc({y}% - 0.75rem)"
  transition:scale={{ duration: 200 }}
  data-sveltekit-reload
>
  <div class="group-hover:scale-150 bg-white relative w-2 h-2 duration-300 origin-[center_18px] z-10">
    <IconMarker class="text-red-500 text-md -translate-x-1 translate-y-[-3px]" />
  </div>

  <div class="tooltip-content w-24 bg-normal shadow-xl rounded-lg p-2 z-20 -top-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300">
    <h1 class="text-md font-bold mb-2">{name}</h1>
    <p class="text-sm">{description}</p>
  </div>
</a>

<style>
  .tooltip-content {
    color: white;
    text-align: center;
    position: absolute;
    left: 280%;
    top: 50%;
    transform: translateY(-50%);
  }
  .tooltip-content::after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent black transparent transparent;
  }
</style>
