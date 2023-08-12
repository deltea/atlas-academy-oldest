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
      continent: data.continent,
    } satisfies TagData);

    goto(`/admin`);
  }
</script>

<TagEditor onSave={create} />
