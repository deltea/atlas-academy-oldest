<script lang="ts">
  import { QueryDocumentSnapshot, writeBatch } from 'firebase/firestore';
  import { ref, uploadBytes } from 'firebase/storage';
  import { db, queryDocs, removeDoc, storage, type TagData } from '$lib/firebase';
  import { getImage, getUuid } from '$lib/utils';
  import { goto } from '$app/navigation';

  export let name = "";
  export let heading = "";
  export let description = "";
  export let slug = "";
  export let continent = "";
  export let image: Blob | string = "";
  export let onSave: (data: TagData) => void;

  function coverUpload(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0] as File;
    if (selectedFile) {
      image = selectedFile;
    }
  }

  async function deleteTag() {
    const docRef = await queryDocs("tags", "slug", "==", slug, 1, false) as QueryDocumentSnapshot[];
    await removeDoc("tags", docRef[0].id);

    setTimeout(() => {
      goto("/admin");
    }, 1000);
  }

  async function save() {
    let coverUrl = "";

    if (image instanceof Blob) {
      const bytes = new Uint8Array(await image.arrayBuffer());
      const storageRef = ref(storage, `/tag-covers/${image.name}-${getUuid()}`);
      coverUrl = await uploadBytes(storageRef, bytes).then(snapshot => {
        return encodeURIComponent(snapshot.ref.fullPath);
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
      continent: continent,
    } satisfies TagData);
  }
</script>

<div class="flex min-h-screen mx-4 my-16 justify-center items-center">
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

    <textarea
      name="description"
      rows="5"
      class="textarea textarea-bordered resize"
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

    <input
      type="text"
      name="Continent"
      class="input input-bordered"
      placeholder="Continent (which continent is the country in)"
      bind:value={continent}
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
          src={image instanceof Blob ? URL.createObjectURL(image) : getImage(image)}
          alt="Cover Preview"
          class="w-40"
        />
      {/if}
    </div>

    <div class="flex items-center gap-2">
      <a href="/admin" class="btn btn-outline flex-grow">Cancel</a>
      <button type="submit" class="btn btn-neutral flex-grow">Save</button>
    </div>

    <button class="btn w-full btn-error text-white" on:click|preventDefault={deleteTag}>Delete Post</button>
  </form>
</div>
