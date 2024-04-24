import type { APIRoute } from "astro";
import { Link, db, eq, isDbError } from "astro:db";
import { customAlphabet } from "nanoid";
import { z } from "zod";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const original = formData.get("original") as string | null;

  const result = z.string().url().safeParse(original);
  if (!result.success) {
    return new Response(
      'Empty or invalid URL! Make sure the "https://" part is included as well.',
      {
        status: 400,
      },
    );
  }

  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7,
  );
  let short;

  // check if short doesn't already exist in database. very unlikely, but we do it anyway
  let flag = true;
  while (flag) {
    short = nanoid();

    try {
      const query = await db.select().from(Link).where(eq(Link.short, short));
      if (query.length === 0) {
        flag = false;
      }
    } catch (err) {
      if (isDbError(err)) {
        return new Response(`Error while querying database: ${err.message}`, {
          status: 500,
        });
      }

      return new Response(`Unknown error occurred: ${err}`, {
        status: 500,
      });
    }
  }

  try {
    await db.insert(Link).values({ original: result.data, short, created: new Date() });
  } catch (err) {
    if (isDbError(err)) {
      return new Response(`Cannot insert new link with id ${short}: ${err.message}`, {
        status: 500,
      });
    }

    return new Response(`Unknown error occurred: ${err}`, {
      status: 500,
    });
  }

  return new Response(short, { status: 200 });
};
