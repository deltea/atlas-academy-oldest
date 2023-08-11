<script lang="ts">
  import Editor from '@tinymce/tinymce-svelte';
  import { writeBatch } from 'firebase/firestore';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
  import { db, storage, type TagData } from '$lib/firebase';

  export let name = "";
  export let heading = "";
  export let description = "";
  export let slug = "";
  export let image: Blob | string = "";
  export let onSave: (data: TagData) => void;

  function coverUpload(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0] as File;
    if (selectedFile) {
      image = selectedFile;
    }
  }

  async function save() {
    let coverUrl = "";

    if (image instanceof Blob) {
      const bytes = new Uint8Array(await image.arrayBuffer());
      const storageRef = ref(storage, `/${image.name}`);
      coverUrl = await uploadBytes(storageRef, bytes).then(snapshot => {
        return getDownloadURL(snapshot.ref);
      });
    } else {
      coverUrl = image;
    }

    const batch = writeBatch(db);

    await batch.commit();

    onSave({
      name,
      slug,
      description,
      heading: heading,
      image: coverUrl,
    } satisfies TagData);
  }
</script>

<form
  on:submit|preventDefault={save}
  enctype="multipart/form-data"
>
  <input
    type="text"
    name="name"
    class="text-input"
    placeholder="Tag name..."
    bind:value={name}
  />

  <input
    type="text"
    name="slug"
    class="text-input"
    placeholder="Slug..."
    bind:value={slug}
  />

  <input
    type="text"
    name="description"
    class="text-input"
    placeholder="Description..."
    bind:value={description}
  />

  <input
    type="text"
    name="Heading"
    class="text-input"
    placeholder="Heading..."
    bind:value={heading}
  />

  <input
    type="file"
    name="cover"
    id="cover"
    class="text-input"
    accept="image/*"
    on:change={coverUpload}
  />

  {#if image}
    <img
      src={image instanceof Blob ? URL.createObjectURL(image) : image}
      alt="Cover Preview"
      class="h-36"
    />
  {/if}

  <button type="submit">Save</button>
</form>
