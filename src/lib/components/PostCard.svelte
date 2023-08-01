<script lang="ts">
	import { getTimeAgo } from '$lib/utils';
  import type { PostData } from "$lib/firebase";

  export let post: PostData;

  let timeAgo = getTimeAgo(post.timestamp);
</script>

<div class="card bg-base-100 shadow-xl min-w-[400px] max-w-[400px] h-96 hover:cursor-pointer hover:scale-sm duration-fast">
  <figure><img src={post.cover} alt={post.title} /></figure>
  <div class="card-body w-full">
    <h2 class="card-title">{post.title}</h2>
    <p>{post.description}</p>
    <div class="flex gap-2">
      {#each post.tags as tag}
        <a href="/" class="btn btn-xs btn-outline normal-case">#{tag}</a>
      {/each}
    </div>
    <small class="text-neutral">{timeAgo}</small>
  </div>
</div>
