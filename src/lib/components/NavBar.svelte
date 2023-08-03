<nav class="flex flex-col m-8 items-center gap-4 text-center">
  <a href="/" class="normal-case text-4xl duration-fast tracking-wider font-thin">
    🌍世界
    <strong>是</strong>
    学校🏫
  </a>
  <p class="text-neutral-400 tracking-widest w-2/3">跟我们一起 Worldschooling!</p>
</nav>

<style>
  a {
    position: relative;
  }
  a::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    bottom: -5px;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: top left;
    @apply bg-neutral;
  }
  a:hover::before {
    transform: scaleX(1);
  }
</style>
