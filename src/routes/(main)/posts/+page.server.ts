import type { PageServerLoad } from './$types';
import { fetchDocs, type PostData } from '$lib/firebase';

export const load = (async () => {
  const posts = await fetchDocs<PostData>("posts");

  return {
    posts
  };
}) satisfies PageServerLoad;
