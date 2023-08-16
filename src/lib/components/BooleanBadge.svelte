<script lang="ts">
  import IconFalse from "~icons/gg/close";
  import IconTrue from "~icons/gg/check";

  export let value: boolean | string;
</script>

<span class="{value ? "bg-success" : "bg-error"} w-5 h-5 text-white inline-flex justify-center items-center rounded-full text-xs">
  {#if value}
    <IconTrue />
  {:else}
    <IconFalse />
  {/if}
</span>
