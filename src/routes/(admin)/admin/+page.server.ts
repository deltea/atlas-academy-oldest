import { type PostData, fetchDocs } from '$lib/firebase';
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const posts = await fetchDocs<PostData>("posts") as PostData[];

  return {
    posts,
  };
}) satisfies PageServerLoad;
