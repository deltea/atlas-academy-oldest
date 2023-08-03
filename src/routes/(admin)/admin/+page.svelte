<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<header class="flex justify-end">
  <a href="/admin/create" class="btn btn-outline normal-case font-bold">
    + Create New
  </a>
</header>

<div class="grid grid-cols-4 gap-4 m-4">
  {#each data.posts as post}
    <a href={`/admin/edit/${post.slug}`} class="card shadow-xl hover:cursor-pointer hover:scale-sm duration-fast">
      <figure><img src={post.cover} alt={post.title} /></figure>
      <div class="card-body">
        <h1 class="card-title">{post.title}</h1>
        <p class="overflow-hidden text-ellipsis line-clamp-4">{post.description}</p>
      </div>
    </a>
  {/each}
</div>
