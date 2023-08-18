import { defineMDSveXConfig as defineConfig } from "mdsvex";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [
    remarkMath,
  ],
  rehypePlugins: [
    [rehypeKatex, {output: 'html'}],
  ],
});

export default config;
