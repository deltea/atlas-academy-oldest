import { fetchDocs, type MarkerData } from "$lib/firebase";
import type { PageServerLoad } from "./$types";

export const load = (async ({ parent }) => {
  await parent();

  const markers = await fetchDocs<MarkerData>("markers") as MarkerData[];

  return {
    markers
  };
}) satisfies PageServerLoad;
