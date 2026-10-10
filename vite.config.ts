import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
import { mdsvex, defineMDSveXConfig } from "mdsvex";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import tailwindcss, { type Config } from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import typography from '@tailwindcss/typography';
import type { PreprocessorGroup } from 'svelte/compiler';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const tailwindConfig: Config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '48rem',
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};

const mdsvexExtensions = [".svelte.md", ".md", ".svx"]
const mdsvexConfig = defineMDSveXConfig({
  extensions: mdsvexExtensions,
  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [
    remarkMath as any,
  ],
  rehypePlugins: [
    rehypeSlug as any,
    [
      rehypeAutolinkHeadings as any,
      {
        behavior: 'append',
        properties: { class: 'heading-anchor', ariaLabel: 'Link to this section' },
        content: {
          type: 'element',
          tagName: 'span',
          properties: { class: 'heading-anchor-icon', ariaHidden: 'true' },
          children: []
        }
      }
    ],
    [rehypeKatex as any, { output: 'html' }]
  ]
});


export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(tailwindConfig), autoprefixer()]
    }
  },
  plugins: [sveltekit({
    extensions: ['.svelte', ...mdsvexExtensions],
    preprocess: [vitePreprocess(), mdsvex(mdsvexConfig) as PreprocessorGroup],
    adapter: adapter(),
    paths: {
      base: ''
    }
  })]
});
