import { type PostData, fetchDocs, type TagData } from "$lib/firebase";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const posts = await fetchDocs<PostData>("posts") as PostData[];
  const tags = await fetchDocs<TagData>("tags") as TagData[];

  return {
    posts,
    tags
  };
}) satisfies PageServerLoad;
