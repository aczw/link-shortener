import { db, Link } from "astro:db"

export default async function() {
  await db.insert(Link).values([
    { short: "test", original: "https://google.com", created: new Date("2024-03-27") },
    { short: "wow", original: "https://charleszw.com", created: new Date("2024-04-10") }
  ])
}