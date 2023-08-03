<script lang="ts">
  import { goto } from '$app/navigation';
  import PostEditor from '$lib/components/PostEditor.svelte';
  import { createDoc, type PostData } from '$lib/firebase';
  import { slugify } from '$lib/utils';

  async function create(data: PostData) {
    await createDoc("posts", {
      title: data.title,
      slug: slugify(data.title),
      description: data.description,
      cover: data.cover,
      body: data.body,
      date: data.date,
      tags: data.tags,
      type: data.type,
    } satisfies PostData);

    goto("/admin");
  }
</script>

<PostEditor onSave={create} />
