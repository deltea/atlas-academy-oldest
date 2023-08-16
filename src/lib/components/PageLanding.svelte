<script lang="ts">
  export let src: string;
  export let center: boolean = false;
</script>

<div
  class="h-screen bg-cover bg-no-repeat bg-center bg-fixed flex items-center bg-gray-300 bg-blend-multiply {center ? "justify-center" : "justify-center lg:justify-start"}"
  style:background-image="url('{src}')"
>
  <div class="absolute bottom-36 text-white text-center space-y-3" class:mx-16={!center}>
    <slot />
  </div>
</div>
