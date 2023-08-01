import { type PostData, queryDocs } from '$lib/firebase';
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const blogPosts = await queryDocs<PostData>("posts", "type", "==", "blog", 6);
  const reflectionPosts = await queryDocs<PostData>("posts", "type", "==", "reflection", 6);

  return {
    blogPosts,
    reflectionPosts,
  };
}) satisfies PageServerLoad;
