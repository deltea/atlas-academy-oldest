import { type PostData, fetchDocs, type TagData, type GalleryPhotoData } from "$lib/firebase";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const posts = await fetchDocs<PostData>("posts") as PostData[];
  const tags = await fetchDocs<TagData>("tags") as TagData[];
  let gallery = await fetchDocs<GalleryPhotoData>("gallery") as GalleryPhotoData[];

  gallery = gallery.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    const aDone = a.description && a.image && a.title && a.tag && a.date;
    const bDone = b.description && b.image && b.title && b.tag && b.date;

    if (aDone !== bDone) {
      return aDone ? 1 : -1;
    } else {
      if (aDone && bDone) {
        return aDate.getTime() - bDate.getTime();
      } else {
        const aPending = a.description || a.image || a.title || a.tag || a.date;
        const bPending = b.description || b.image || b.title || b.tag || b.date;

        if (aPending && bPending) {
          return aDate.getTime() - bDate.getTime();
        } else {
          return aPending ? - 1 : 1;
        }
      }
    }
  });

  return {
    posts,
    tags,
    gallery
  };
}) satisfies PageServerLoad;
