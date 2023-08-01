<script lang="ts">
  import { type PostData, createDoc, type PostType, storage } from '$lib/firebase';
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

  let tagInput: string = "";
  let tags: string[] = [];
  let title: string;
  let description: string;
  let coverPreview: string = "";
  let cover: Blob;
  let body: string;
  let date: string;
  let type: PostType;

  function addTag() {
    tags = [...tags, tagInput.toLowerCase()];
    tagInput = "";
  }

  function coverUpload(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0] as File;
    if (selectedFile) {
      coverPreview = URL.createObjectURL(selectedFile);
      cover = selectedFile;
    }
  }

  async function save() {
    const timestamp = new Date(date).getUTCSeconds();

    let coverUrl = "";

    if (cover instanceof File) {
      const bytes = new Uint8Array(await cover.arrayBuffer());
      const storageRef = ref(storage, `/${cover.name}`);
      coverUrl = await uploadBytes(storageRef, bytes).then(snapshot => {
        return getDownloadURL(snapshot.ref);
      });
    }

    const docRef = await createDoc("posts", {
      title,
      description,
      cover: coverUrl,
      body,
      timestamp,
      tags,
      type,
    } satisfies PostData);
    console.log(docRef.id);
  }
</script>

<form
  class="grid grid-cols-10 grid-rows-9 h-screen overflow-hidden gap-4 p-4"
  on:submit|preventDefault={save}
  enctype="multipart/form-data"
>
  <input
    type="text"
    name="title"
    class="text-input row-span-1 col-span-6 font-bold text-2xl"
    placeholder="Post name..."
    bind:value={title}
  />

  <select
    name="type"
    id="type"
    class="col-span-1 rounded-lg bg-base-200 p-2 outline-none"
    bind:value={type}
  >
    <option value="blog">Blog</option>
    <option value="reflection">Reflection</option>
  </select>

  <div class="col-span-3 inline-flex gap-4">
    <button class="btn btn-neutral flex-grow">Save</button>
  </div>

  <textarea
    class="resize-none text-input w-full h-full col-span-6 row-start-2 row-span-full text-lg"
    name="body"
    id="body"
    bind:value={body}
  />

  <div class="col-span-4 row-start-2 row-span-full gap-2 overflow-auto p-2 scrolling">
    <div class="collapse collapse-arrow bg-base-200 my-2">
      <input type="checkbox" name="accordion-1" checked />
      <div class="collapse-title text-xl font-medium">
        Description
      </div>
      <div class="collapse-content">
        <textarea
          class="resize-none text-input w-full h-full text-md"
          name="description"
          id="description"
          bind:value={description}
        />
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200 my-2">
      <input type="checkbox" name="accordion-2" checked />
      <div class="collapse-title text-xl font-medium">
        Date
      </div>
      <div class="collapse-content">
        <input
          type="date"
          name="timestamp"
          id="timestamp"
          class="p-2 text-input"
          bind:value={date}
        />
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200 my-2">
      <input type="checkbox" name="accordion-3" checked />
      <div class="collapse-title text-xl font-medium">
        Tags
      </div>
      <div class="collapse-content">
        <form on:submit|preventDefault={addTag}>
          <input type="text" class="w-full text-input h-10" bind:value={tagInput} />
        </form>
        <div class="flex gap-1 mt-2">
          {#each tags as tag}
            <p class="btn btn-xs btn-outline normal-case">#{tag}</p>
          {/each}
        </div>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200 my-2">
      <input type="checkbox" name="accordion-4" checked />
      <div class="collapse-title text-xl font-medium">
        Cover
      </div>
      <div class="collapse-content">
        <input
          type="file"
          name="cover"
          id="cover"
          class="p-2 text-input"
          accept="image/*"
          on:change={coverUpload}
        />
        {#if coverPreview}
          <img src={coverPreview} alt="Cover Preview" class="h-36" />
        {/if}
      </div>
    </div>
  </div>
</form>
