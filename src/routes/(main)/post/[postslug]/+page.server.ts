import { queryDocs, type PostData } from '$lib/firebase';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const results = await queryDocs("posts", "slug", "==", params.postslug, 1);
  const post = results[0] as PostData;

  return {
    post
  };
}) satisfies PageServerLoad;

