import { queryDocs, type PostData, orderDocs } from '$lib/firebase';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const results = await queryDocs("posts", "slug", "==", params.postslug, 1);
  const post = results[0] as PostData;

  let recentPosts = await orderDocs("posts", "date", "desc", 6) as PostData[];

  if (recentPosts.findIndex(p => p.slug === post.slug) !== -1) {
    recentPosts = recentPosts.filter(p => p.slug !== post.slug);
  } else {
    recentPosts.pop();
  }

  return {
    post,
    recentPosts,
  };
}) satisfies PageServerLoad;

