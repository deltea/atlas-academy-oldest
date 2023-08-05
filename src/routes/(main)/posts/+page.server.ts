import type { PageServerLoad } from './$types';
import { queryDocs, type PostData, fetchDocs } from '$lib/firebase';

export const load = (async ({ url }) => {
  const q = url.searchParams.get("q");
  const tags = url.searchParams.get("tags");

  console.log("Query: ", q ?? "none");
  console.log("Tags: ", tags?.split(",") ?? []);

  const posts = await fetchDocs<PostData>("posts");

  return {
    posts
  };
}) satisfies PageServerLoad;
