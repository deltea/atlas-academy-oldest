import { fetchDocs, type MarkerData } from '$lib/firebase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const markers = await fetchDocs<MarkerData>("markers") as MarkerData[];

  return {
    markers
  };
}) satisfies PageServerLoad;
