const math = require("remark-math");
const katex = require("rehype-katex");

const internetProfiles = {
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rahul-gill-466a1620a/",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/rahul-gill",
  },
  email: {
    label: "Email",
    href: "mailto:rgill1@protonmail.com",
  },
  blog: {
    label: "Blog",
    to: "blog",
  },
  docs: {
    label: "Documentation",
    to: "docs",
  },
  projects: {
    label: "Projects",
    to: "projects",
  },
  about: {
    label: "About",
    to: "about",
  },
  resume: {
    label: "Resume",
    href: "https://drive.google.com/file/d/1ZsqIyDdkrzXBqItw9YmDtEKZ4pY7EKSl/view?usp=sharing",
  },
};

const credits = {
  evantay: {
    label: "Evan Tay",
    href: "https://evantay.com/"
  },
  docusaurus: {
    label: "Docusaurus",
    href: "https://docusaurus.io/"
  }
}

module.exports = {
  title: "Rahul Gill",
  tagline:
    "I am a Student and Software Engineer passionate about solving Meaningful Problems.",
  url: "https://rahul-gill.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/logo.png",
  projectName: "kaya-folio",
  plugins: ["posthog-docusaurus"],
  themeConfig: {
    prism: {
      additionalLanguages: ['kotlin', 'sql'],
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: true,
      title: "Rahul Gill",
      logo: {
        alt: "Rahul GIll",
        src: "img/logo.png",
        href: "https://rahul-gill.github.io",
        target: "_self",
      },
      items: [
        { to: "blog/", label: "Blog", position: "left" },
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "projects/", label: "Projects", position: "right" },
        { to: "about/", label: "About", position: "right" },
        {
          href: "https://drive.google.com/file/d/1ZsqIyDdkrzXBqItw9YmDtEKZ4pY7EKSl/view?usp=sharing",
          label: "Resume",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Connect",
          items: [
            internetProfiles.linkedin,
            internetProfiles.github,
            internetProfiles.email,
          ],
        },
        {
          title: "Discover",
          items: [
            internetProfiles.blog,
            internetProfiles.docs,
            internetProfiles.projects,
            internetProfiles.about,
            internetProfiles.resume,
          ],
        },
        {
          title: "Credits",
          items: [
              credits.evantay,
              credits.docusaurus
          ],
        },
      ],
      copyright: `Last updated on ${new Date().toDateString()} `,
    },
    posthog: {
      apiKey: process.env.POSTHOG_API_KEY || "DEV",
      enableInDevelopment: false,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          disableVersioning: false,
          editCurrentVersion: false,
          remarkPlugins: [math, [require('mdx-mermaid'), { mermaid: { theme: 'dark' } }]],
          rehypePlugins: [katex],
        },
        blog: {
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          editUrl: "https://github.com/rahul-gill/rahul-gill.github.io",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
    },
  ],
};
