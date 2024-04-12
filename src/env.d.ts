/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ASTRO_STUDIO_APP_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
