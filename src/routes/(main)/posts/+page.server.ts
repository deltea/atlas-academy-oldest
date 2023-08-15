import type { PageServerLoad } from "./$types";
import { type PostData, fetchDocs } from "$lib/firebase";

export const load = (async ({ url }) => {
  const q = url.searchParams.get("search");

  let posts = await fetchDocs("posts") as PostData[];
  const fetchedCount = posts.length;

  posts = posts.filter(post => {
    const titleHasQ = post.title.toLowerCase().includes(q ?? "");
    const qHasTitle = q ? q.includes(post.title.toLowerCase()) : true;
    const tagsHasQ = post.tags.includes(q ?? "");

    return titleHasQ || qHasTitle || tagsHasQ;
  }).flatMap(i => Array.from({ length: 100 }).fill(i) as PostData[]);

  return {
    posts,
    count: posts.length,
    showingAll: posts.length === fetchedCount
  };
}) satisfies PageServerLoad;
