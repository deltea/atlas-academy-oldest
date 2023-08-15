import { type PostData, orderDocs, fetchDocs } from "$lib/firebase";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const allPosts = await fetchDocs("posts") as PostData[];
  allPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const postIndex = allPosts.indexOf(allPosts.filter(post => post.slug === params.postslug)[0]);
  const post = allPosts[postIndex];
  const nextPost = allPosts[postIndex + 1];
  const previousPost = allPosts[postIndex - 1];

  let recentPosts = await orderDocs("posts", "date", "desc", 6) as PostData[];

  if (recentPosts.findIndex(p => p.slug === post?.slug) !== -1) {
    recentPosts = recentPosts.filter(p => p.slug !== post?.slug);
  } else {
    recentPosts.pop();
  }

  return {
    post,
    nextPost,
    previousPost,
    recentPosts,
  };
}) satisfies PageServerLoad;

