<script lang="ts">
	import GalleryEditor from "$lib/components/GalleryEditor.svelte";
  import { queryDocs, type GalleryPhotoData, changeDoc } from "$lib/firebase";
  import type { DocumentData } from "firebase/firestore";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

  export let data: PageData;

  async function save(photo: GalleryPhotoData) {
    const results = await queryDocs(
      "gallery",
      "image",
      "==",
      data.photo.image,
      1,
      false
    ) as DocumentData[];

    const docId = results[0].id;

    await changeDoc("gallery", docId, {
      title: photo.title,
      description: photo.description,
      image: photo.image,
      tag: photo.tag,
      date: photo.date,
    } satisfies GalleryPhotoData);

    goto(`/admin`);
  }
</script>

<GalleryEditor {...data.photo} onSave={save} />
