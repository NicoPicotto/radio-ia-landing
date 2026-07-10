import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import reveal from 'astro-reveal';

export default defineConfig({
  integrations: [reveal({ mode: 'observer' })],
  vite: {
    plugins: [tailwindcss()],
  },
});
