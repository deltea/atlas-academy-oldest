import type { PageServerLoad } from "./$types";
import { fetchDocs, type MarkerData, type TagData } from "$lib/firebase";

export const load = (async () => {
  const tags = await fetchDocs("tags") as TagData[];
  const markers = await fetchDocs<MarkerData>("markers") as MarkerData[];

  return { tags, markers };
}) satisfies PageServerLoad;
