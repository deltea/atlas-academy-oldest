<script lang="ts">
  import { QueryDocumentSnapshot, writeBatch } from 'firebase/firestore';
  import { ref, uploadBytes } from 'firebase/storage';
  import { db, queryDocs, removeDoc, storage, type GalleryPhotoData } from '$lib/firebase';
  import { getImage, getUuid } from '$lib/utils';
  import { goto } from '$app/navigation';
  import IconTrash from "~icons/gg/trash";

  export let title = "";
  export let description = "";
  export let tag = "";
  export let date = "";
  export let image: Blob | string = "";
  export let onSave: (data: GalleryPhotoData) => void;

  function coverUpload(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0] as File;
    if (selectedFile) {
      image = selectedFile;
    }
  }

  async function deletePhoto() {
    const docRef = await queryDocs("gallery", "image", "==", image, 1, false) as QueryDocumentSnapshot[];
    await removeDoc("gallery", docRef[0].id);

    setTimeout(() => {
      goto("/admin");
    }, 1000);
  }

  async function save() {
    let imageUrl = "";

    if (image instanceof Blob) {
      const bytes = new Uint8Array(await image.arrayBuffer());
      const storageRef = ref(storage, `/gallery/${image.name}-${getUuid()}`);
      imageUrl = await uploadBytes(storageRef, bytes).then(snapshot => {
        return encodeURIComponent(snapshot.ref.fullPath);
      });
    } else {
      imageUrl = image;
    }

    const batch = writeBatch(db);

    await batch.commit();

    onSave({
      title,
      description,
      image: imageUrl,
      tag,
      date
    } satisfies GalleryPhotoData);
  }
</script>

<div class="flex min-h-screen mx-4 justify-center items-center">
  <form
    on:submit|preventDefault={save}
    enctype="multipart/form-data"
    class="w-1/2 flex flex-col gap-2"
  >
    <input
      type="text"
      name="Title"
      class="input input-bordered"
      placeholder="Title (like a caption)"
      bind:value={title}
    />

    <textarea
      name="description"
      rows="5"
      class="textarea textarea-bordered resize"
      placeholder="Description (about the photo)"
      bind:value={description}
    />

    <input
      type="date"
      name="date"
      id="date"
      bind:value={date}
    />

    <input
      type="text"
      name="Country"
      class="input input-bordered"
      placeholder="Country (which country the photo is in)"
      bind:value={tag}
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

    <button class="btn w-full btn-error text-white" on:click|preventDefault={deletePhoto}>
      <IconTrash />
      Delete Photo
    </button>
  </form>
</div>
