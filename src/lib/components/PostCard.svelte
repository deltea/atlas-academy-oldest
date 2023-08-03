<script lang="ts">
	import { formatDate } from '$lib/utils';
  import type { PostData } from "$lib/firebase";

  export let post: PostData;
  export let urlPrefix: string;
</script>

<a
  href={`${urlPrefix}/${post.slug}`}
  class="card bg-base-100 shadow-xl min-w-[300px] max-w-[300px] max-h-96 hover:scale-sm duration-fast group"
  {...$$restProps}
>
  <figure><img src={post.cover} alt={post.title} class="group-hover:scale-105 duration-500" /></figure>
  <div class="card-body w-full">
    <h2 class="card-title">{post.title}</h2>
    <p class="overflow-hidden text-ellipsis line-clamp-4">{post.description}</p>
    <div>
      {#each post.tags as tag}
        <a href="/" class="btn btn-xs btn-outline normal-case mx-0.5">#{tag}</a>
      {/each}
    </div>
    <small class="text-neutral">{formatDate(post.date)}</small>
  </div>
</a>
