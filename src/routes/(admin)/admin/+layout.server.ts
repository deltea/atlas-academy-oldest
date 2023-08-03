import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PASSWORD } from "$env/static/private";

export const load = (async ({ cookies }) => {
  if (cookies.get("password") !== PASSWORD) {
    throw redirect(302, "/");
  }

  return {};
}) satisfies LayoutServerLoad;
