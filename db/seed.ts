import { db, Link } from "astro:db";

export default async function () {
  await db.insert(Link).values([
    { short: "test", original: "https://google.com", created: new Date("2024-03-27") },
    { short: "wow", original: "https://charleszw.com", created: new Date("2024-04-10") },
    {
      short: "hurray",
      original: "https://charleszw.com/mini-minecraft",
      created: new Date("2023-11-26"),
    },
    {
      short: "spotify",
      original: "https://open.spotify.com/user/zhwq0rxdn060sgar22e07u193",
      created: new Date("2024-04-12"),
    },
  ]);
}
