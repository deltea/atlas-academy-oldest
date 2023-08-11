import type { PageServerLoad } from "./$types";
import { type PostData, fetchDocs } from "$lib/firebase";

export const load = (async ({ url }) => {
  const q = url.searchParams.get("search");

  let posts = await fetchDocs("posts") as PostData[];
  const fetchedCount = posts.length;

  posts = posts.filter(post => {
    const titleHasQ = post.title.toLowerCase().includes(q ?? "");
    const qHasTitle = q ? q.includes(post.title.toLowerCase()) : true;

    console.log(post.title, titleHasQ, qHasTitle);

    return (titleHasQ || qHasTitle);
  });

  return {
    posts,
    count: posts.length,
    showingAll: posts.length === fetchedCount
  };
}) satisfies PageServerLoad;
