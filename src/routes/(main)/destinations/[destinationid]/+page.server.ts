import { type PostData, queryDocs, fetchDoc, type TagData } from "$lib/firebase";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const posts = await queryDocs<PostData>(
    "posts",
    "tags",
    "array-contains",
    params.destinationid
  ) as PostData[];

  const tag = await fetchDoc("tags", params.destinationid) as TagData;

  return { posts, tag };
}) satisfies PageServerLoad;
