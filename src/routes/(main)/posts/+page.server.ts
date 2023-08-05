import type { PageServerLoad } from './$types';
import { type PostData, fetchDocs } from '$lib/firebase';

export const load = (async ({ url }) => {
  // const q = url.searchParams.get("q");
  // const type = url.searchParams.get("type");
  // const tags = url.searchParams.get("tags");

  // const query = { q, type, tags };

  // console.log("Query: ", q ?? "");
  // console.log("Typpe: ", type ?? "");
  // console.log("Tags: ", tags?.split(",") ?? []);

  // let posts = await fetchDocs("posts") as PostData[];
  // posts = posts.filter(post => {
  //   const titleHasQ = q ? post.title.toLowerCase().includes(q.toLowerCase()) : true;
  //   const qHasTitle = q ? q.toLowerCase().includes(post.title.toLowerCase()) : true;
  //   const qType = type ? post.type === type : true;
  //   const tagsHasQ = tags ? post.tags.some(tag => tags.split(",").includes(tag)) : true;

  //   console.log(post.title, titleHasQ, qHasTitle, qType, tagsHasQ);

  //   return (
  //     (titleHasQ || qHasTitle) && qType && tagsHasQ
  //   );
  // });

  // return {
  //   query,
  //   posts
  // };
  return {};
}) satisfies PageServerLoad;
