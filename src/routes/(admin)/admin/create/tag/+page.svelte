<script lang="ts">
  import { goto } from "$app/navigation";
  import TagEditor from "$lib/components/TagEditor.svelte";
  import { createDoc, type PostData, type TagData } from "$lib/firebase";

  async function create(data: TagData) {
    await createDoc("tags", {
      name: data.name,
      heading: data.heading,
      description: data.description,
      image: data.image,
      slug: data.slug,
    } satisfies TagData);

    goto(`/destinations/${data.slug}`);
  }
</script>

<TagEditor onSave={create} />
