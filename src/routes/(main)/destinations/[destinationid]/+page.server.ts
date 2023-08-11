import { type PostData, queryDocs, fetchDoc, type TagData } from "$lib/firebase";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const posts = await queryDocs<PostData>(
    "posts",
    "tags",
    "array-contains",
    params.destinationid
  ) as PostData[];

  const results = await queryDocs("tags", "slug", "==", params.destinationid, 1);
  const tag = results[0] as TagData;

  return { posts, tag };
}) satisfies PageServerLoad;
