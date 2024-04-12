import { column, defineDb, defineTable, NOW } from "astro:db";

const Link = defineTable({
  columns: {
    short: column.text({ primaryKey: true }),
    original: column.text(),
    created: column.date({ default: NOW })
  }
})

export default defineDb({
  tables: {
    Link
  },
});
