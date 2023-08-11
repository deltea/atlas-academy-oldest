<script lang="ts">
  import { changeDoc, queryDocs, type TagData } from "$lib/firebase";
  import type { DocumentData } from "firebase/firestore";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";
  import TagEditor from "$lib/components/TagEditor.svelte";

  export let data: PageData;

  async function save(tag: TagData) {
    const results = await queryDocs(
      "tags",
      "slug",
      "==",
      data.slug,
      1,
      false
    ) as DocumentData[];

    const docId = results[0].id;

    await changeDoc("tags", docId, {
      name: tag.name,
      slug: tag.slug,
      description: tag.description,
      image: tag.image,
      heading: tag.heading,
    } satisfies TagData);

    goto(`/destinations/${tag.slug}`);
  }
</script>

<TagEditor {...data.tag} onSave={save} />
