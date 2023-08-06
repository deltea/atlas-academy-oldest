import { queryDocs, type PostData } from '$lib/firebase';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
  await parent();

  const results = await queryDocs("posts", "slug", "==", params.postslug, 1);
  const post = results[0] as PostData;

  return {
    post,
    slug: params.postslug,
  };
}) satisfies PageServerLoad;
