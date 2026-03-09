import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://example.com',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), react(), sitemap()],
  vite: {
    ssr: {
      noExternal: ['@supabase/supabase-js']
    }
  }
});
