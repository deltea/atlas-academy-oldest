import type { PageServerLoad } from "./$types";
import { type PostData, fetchDocs, type MarkerData } from "$lib/firebase";
import type { DocumentData } from "firebase/firestore";

export const load = (async ({ url }) => {
  const q = url.searchParams.get("q")?.toLowerCase() ?? "";
  const type = url.searchParams.get("type")?.toLowerCase() ?? "all";
  const tags = url.searchParams.get("tags")?.split(",") ?? [];

  const query = { q, type, tags };

  console.log("Query: ", q ?? "");
  console.log("Typpe: ", type ?? "");
  console.log("Tags: ", tags ?? []);

  let posts = await fetchDocs("posts") as PostData[];
  posts = posts.filter(post => {
    const titleHasQ = post.title.toLowerCase().includes(q ?? "");
    const qHasTitle = q ? q.includes(post.title.toLowerCase()) : true;
    const qType = type !== "all" ? post.type === type : true;
    const tagsHasQ = tags.length > 0 ? post.tags.some(tag => tags.includes(tag)) : true;

    console.log(post.title, titleHasQ, qHasTitle, qType, tagsHasQ);

    return (
      (titleHasQ || qHasTitle) && qType && tagsHasQ
    );
  });

  const allTags = (await fetchDocs("tags", false) as DocumentData[]).map(doc => doc.id) as string[];

  const markers = await fetchDocs<MarkerData>("markers") as MarkerData[];

  return {
    query,
    posts,
    allTags,
    markers
  };
}) satisfies PageServerLoad;
