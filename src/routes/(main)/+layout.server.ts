import type { LayoutServerLoad } from "./$types";
import { PASSWORD } from "$env/static/private";

export const load = (async ({ cookies }) => {
  const isAdmin = cookies.get("password") === PASSWORD;

  return { isAdmin };
}) satisfies LayoutServerLoad;
