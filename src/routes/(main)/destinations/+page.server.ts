import type { PageServerLoad } from "./$types";
import { fetchDocs, type TagData } from "$lib/firebase";

export const load = (async () => {
  const tags = await fetchDocs("tags") as TagData[];

  return { tags };
}) satisfies PageServerLoad;
