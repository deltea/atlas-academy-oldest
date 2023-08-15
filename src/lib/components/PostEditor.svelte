<script lang="ts">
  import { type PostData, type PostType, storage, db, removeDoc, fetchDoc, queryDocs } from '$lib/firebase';
  import { ref, uploadBytes } from 'firebase/storage';
  import Editor from '@tinymce/tinymce-svelte';
  import { getImage, getUuid, slugify } from '$lib/utils';
  import { slide } from 'svelte/transition';
  import { writeBatch, type DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

  import IconRight from '~icons/gg/arrow-right';
  import IconLeft from '~icons/gg/arrow-left';
  import { goto } from '$app/navigation';

  export let tags: string[] = [];
  export let title: string = "";
  export let description: string = "";
  export let cover: Blob | string = "";
  export let body: string = "";
  export let date: string = "";
  export let type: PostType = "blog";
  export let podcast: string[] = [];
  export let onSave: (data: PostData) => void;

  let tagInput: string = "";
  let podcastInput: string = "";
  let sidebarShow = true;

  function addTag() {
    tags = [...tags, tagInput.toLowerCase()];
    tagInput = "";
  }

  function addPodcastEpisode() {
    podcast = [...podcast, podcastInput];
    podcastInput = "";
  }

  function coverUpload(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0] as File;
    if (selectedFile) {
      cover = selectedFile;
    }
  }

  async function deletePost() {
    const docRef = await queryDocs("posts", "title", "==", title, 1, false) as QueryDocumentSnapshot[];
    await removeDoc("posts", docRef[0].id);

    setTimeout(() => {
      goto("/admin");
    }, 1000);
  }

  async function save() {
    let coverUrl = "";

    if (cover instanceof Blob) {
      const bytes = new Uint8Array(await cover.arrayBuffer());
      const storageRef = ref(storage, `/post-covers/${cover.name}-${getUuid()}`);
      coverUrl = await uploadBytes(storageRef, bytes).then(snapshot => {
        return encodeURIComponent(snapshot.ref.fullPath);
      });
    } else {
      coverUrl = cover;
    }

    const batch = writeBatch(db);

    await batch.commit();

    onSave({
      title,
      slug: slugify(title),
      description,
      cover: coverUrl,
      body,
      date,
      tags,
      type,
      podcast,
    } satisfies PostData);
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
    <a href="/admin" class="btn btn-outline flex-grow w-10 normal-case font-bold">Cancel</a>
    <button class="btn btn-neutral flex-grow normal-case font-bold text-white">Save</button>
  </div>

  <div class="flex row-start-2 col-span-full row-span-full gap-4">
    <Editor
      bind:value={body}
      apiKey="5pdf4p7rrxs1jt7crui6pi784kslztlbri2sbptj9p6ia70g"
      cssClass="flex-grow"
      conf={{
        resize: false,
        height: "100%",
        width: "100%",
        removed_menuitems: "newdocument fonts superscript subscript fontfamily lineheight",
        plugins: "wordcount link image",
        elementpath: false,
        branding: false,
        statusbar: true,
        toolbar: "undo redo | styles | bold italic | link image hr | alignleft aligncenter alignright",
        icons: "small",
        image_caption: true,
      }}
    />

    {#if sidebarShow}
      <div class="w-2/5 gap-2 overflow-auto" transition:slide={{ axis: "x" }}>
        <div class="collapse collapse-arrow bg-base-200 my-2">
          <input type="checkbox" name="accordion-1" checked />
          <div class="collapse-title text-xl font-medium">
            Description
          </div>
          <div class="collapse-content">
            <textarea
              rows="6"
              class="text-input w-full text-md"
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
              class="text-input"
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
                <a href="/destinations/{tag}" class="btn btn-xs btn-outline normal-case">{tag}</a>
              {/each}
            </div>
          </div>
        </div>
        <div class="collapse collapse-arrow bg-base-200 my-2">
          <input type="checkbox" name="accordion-4" checked />
          <div class="collapse-title text-xl font-medium">
            Cover
          </div>
          <div class="collapse-content space-y-2">
            <input
              type="file"
              name="cover"
              id="cover"
              class="text-input"
              accept="image/*"
              on:change={coverUpload}
            />
            {#if cover}
              <img
                src={cover instanceof Blob ? URL.createObjectURL(cover) : getImage(cover, "sm")}
                alt="Cover Preview"
                class="h-36"
              />
            {/if}
          </div>
        </div>
        <div class="collapse collapse-arrow bg-base-200 my-2">
          <input type="checkbox" name="accordion-5" checked />
          <div class="collapse-title text-xl font-medium">
            Podcast Episodes
          </div>
          <div class="collapse-content space-y-2">
            <form on:submit|preventDefault={addPodcastEpisode}>
              <input type="text" class="w-full text-input h-10" bind:value={podcastInput} />
            </form>
            <ul class="flex flex-col gap-1">
              {#each podcast as episode}
                <iframe
                  title="Spotify Player"
                  class="rounded-2xl w-full h-20"
                  src="https://open.spotify.com/embed{episode.match(/\/episode\/([^\/?]+)/g)}?theme=0&utm_source=generator"
                  frameBorder="0"
                  allowfullscreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              {/each}
            </ul>
          </div>
        </div>

        <button class="btn w-full btn-error" on:click|preventDefault={deletePost}>Delete Post</button>
      </div>
    {/if}

    <aside class="w-5 flex flex-col justify-center items-center">
      <button on:click|preventDefault={() => sidebarShow = !sidebarShow} class="btn btn-circle btn-outline btn-sm">
        {#if sidebarShow}
          <IconRight />
        {:else}
          <IconLeft />
        {/if}
      </button>
    </aside>
  </div>
</form>
