import { type PostData, fetchDocs, type TagData, type GalleryPhotoData, orderDocs } from "$lib/firebase";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const posts = await fetchDocs<PostData>("posts") as PostData[];
  const tags = await fetchDocs<TagData>("tags") as TagData[];
  const gallery = await orderDocs<GalleryPhotoData>("gallery", "date", "desc") as GalleryPhotoData[];

  return {
    posts,
    tags,
    gallery
  };
}) satisfies PageServerLoad;
