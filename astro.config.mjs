import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://example.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind(), react(), sitemap()],
  vite: {
    ssr: {
      noExternal: ['@supabase/supabase-js']
    }
  }
});
