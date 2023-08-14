import type { PageServerLoad } from "./$types";
import { type PostData, fetchDocs } from "$lib/firebase";

export const load = (async () => {
  const posts = await fetchDocs<PostData>("posts") as PostData[];
  posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return { posts };
}) satisfies PageServerLoad;
