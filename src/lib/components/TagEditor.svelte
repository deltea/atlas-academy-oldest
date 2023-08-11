<script lang="ts">
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

<div class="flex h-screen justify-center items-center">
  <form
    on:submit|preventDefault={save}
    enctype="multipart/form-data"
    class="w-1/2 flex flex-col gap-2"
  >
    <input
      type="text"
      name="name"
      class="input input-bordered"
      placeholder="Tag name (name that will be displayed)"
      bind:value={name}
    />

    <input
      type="text"
      name="slug"
      class="input input-bordered"
      placeholder="Slug (identifier)"
      bind:value={slug}
    />

    <input
      type="text"
      name="description"
      class="input input-bordered"
      placeholder="Description (about the tag)"
      bind:value={description}
    />

    <input
      type="text"
      name="Heading"
      class="input input-bordered"
      placeholder="Heading (above description)"
      bind:value={heading}
    />

    <div class="inline-flex items-center justify-center">
      <input
        type="file"
        name="cover"
        id="cover"
        class="input file-input"
        accept="image/*"
        on:change={coverUpload}
      />

      {#if image}
        <img
          src={image instanceof Blob ? URL.createObjectURL(image) : image}
          alt="Cover Preview"
          class="w-40"
        />
      {/if}
    </div>

    <div class="flex items-center gap-2">
      <a href="/admin" class="btn btn-outline flex-grow">Cancel</a>
      <button type="submit" class="btn btn-neutral flex-grow">Save</button>
    </div>
  </form>
</div>
