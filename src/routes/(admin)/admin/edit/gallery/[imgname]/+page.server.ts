import { queryDocs, type GalleryPhotoData } from "$lib/firebase";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const id = encodeURIComponent(params.imgname);
  const results = await queryDocs("gallery", "image", "==", id, 1);
  const photo = results[0] as GalleryPhotoData;

  return { photo };
}) satisfies PageServerLoad;
