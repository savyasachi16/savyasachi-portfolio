// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://savyasachi.dev',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
