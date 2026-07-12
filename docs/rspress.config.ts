import { defineConfig } from '@rspress/core';
import * as path from 'node:path';
import katex from 'rspress-plugin-katex';
import mermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  icon: '/logo.png',
  lang: 'en',
  logo: '/logo.png',
  logoHref: 'https://geostrategic.particlesystem.com/',
  logoText: 'Geostrategic',
  outDir: 'public',
  plugins: [
    katex(),
    mermaid({
      mermaidConfig: {
        theme: 'neutral',
      },
    }),
  ],
  root: path.join(__dirname, 'docs'),
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/haydn/geostrategic-w00/',
      },
    ],
  },
  title: 'Docs | World 00 | Geostrategic',
});
