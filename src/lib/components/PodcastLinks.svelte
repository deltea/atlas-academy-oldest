<script lang="ts">
  import IconApplePodcast from '~icons/simple-icons/applepodcasts';
  import IconSpotify from '~icons/mdi/spotify';
</script>

<div class="flex flex-col w-full gap-1">
  <a
    href="https://open.spotify.com/show/7xuJTB7kCfKB0JVBkgW4k3"
    target="_blank"
    class="py-2 px-2.5 rounded-xl flex items-center btn btn-neutral text-left w-full justify-start h-fit"
  >
    <IconApplePodcast class="text-purple-500 bg-white rounded-xl text-4xl" />
    <div class="flex flex-col">
      <small class="-mb-0.5">Listen on</small>
      <h3 class="text-xl -mt-0.5 normal-case">Apple Podcasts</h3>
    </div>
  </a>
  <a
    href="https://podcasts.apple.com/us/podcast/%E4%B8%96%E7%95%8C%E6%98%AF%E5%AD%B8%E6%A0%A1-worldschooling/id1646258789"
    target="_blank"
    class="py-2 px-2.5 rounded-xl flex items-center btn btn-neutral text-left w-full justify-start h-fit"
  >
    <IconSpotify class="text-green-500 text-4xl" />
    <div class="flex flex-col">
      <small class="-mb-0.5">Listen on</small>
      <h3 class="text-xl -mt-0.5 normal-case">Spotify</h3>
    </div>
  </a>
</div>
