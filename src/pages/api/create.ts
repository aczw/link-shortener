import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const original = formData.get("original");

  if (!original) {
    return new Response(JSON.stringify({ message: "Missing original URL" }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: "success!" }), { status: 200 });
};
