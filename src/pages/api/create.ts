import type { APIRoute } from "astro";
import { Link, db, isDbError } from "astro:db";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const original = formData.get("original") as string | null;

  if (!original) {
    return new Response(JSON.stringify({ message: "Missing original URL" }), { status: 400 });
  }

  // TODO: zod validation

  const nanoid = customAlphabet(alphanumeric, 7);
  const short = nanoid();

  // check if short doesn't already exist

  try {
    await db.insert(Link).values({ original, short, created: new Date() });
  } catch (err) {
    if (isDbError(err)) {
      return new Response(
        JSON.stringify({ message: `Cannot insert new link with id ${short}: ${err.message}` }),
        {
          status: 400,
        },
      );
    }

    return new Response(JSON.stringify({ message: `Unknown error occurred: ${err}` }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: short }), { status: 200 });
};
