import type { PageServerLoad } from "./$types";
import { queryDocs, type PostData } from "$lib/firebase";

export const load = (async () => {
  const posts = await queryDocs<PostData>("posts", "type", "==", "blog") as PostData[];
  posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const rightPosts = posts.filter((_, i) => i % 2 === 0);
  const leftPosts = posts.filter((_, i) => i % 2 !== 0);

  return { posts, rightPosts, leftPosts };
}) satisfies PageServerLoad;
