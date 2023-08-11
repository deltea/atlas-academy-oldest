import { queryDocs, type TagData } from "$lib/firebase";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, parent }) => {
  await parent();

  const results = await queryDocs("tags", "slug", "==", params.tagslug, 1);
  const tag = results[0] as TagData;

  return {
    tag,
    slug: params.tagslug,
  };
}) satisfies PageServerLoad;
