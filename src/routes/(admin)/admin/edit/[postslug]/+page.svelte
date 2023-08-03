<script lang="ts">
	import PostEditor from '$lib/components/PostEditor.svelte';
  import { type PostData, queryDocs, changeDoc } from '$lib/firebase';
  import type { DocumentData } from 'firebase/firestore';
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  import { slugify } from '$lib/utils';

  export let data: PageData;

  async function save(post: PostData) {
    const results = await queryDocs(
      "posts",
      "slug",
      "==",
      data.slug,
      1,
      false
    ) as DocumentData[];

    const docId = results[0].id;

    await changeDoc("posts", docId, {
      title: post.title,
      slug: slugify(post.title),
      description: post.description,
      cover: post.cover,
      body: post.body,
      date: post.date,
      tags: post.tags,
      type: post.type,
    } satisfies PostData);

    goto("/admin");
  }
</script>

<PostEditor {...data.post} onSave={save} />
