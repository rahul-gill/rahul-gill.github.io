
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/about',
    component: ComponentCreator('/about','d5d'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog','eaf'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','358'),
    exact: true
  },
  {
    path: '/blog/blog-path',
    component: ComponentCreator('/blog/blog-path','264'),
    exact: true
  },
  {
    path: '/blog/mifos-ui',
    component: ComponentCreator('/blog/mifos-ui','f9b'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags','9e1'),
    exact: true
  },
  {
    path: '/blog/tags/android',
    component: ComponentCreator('/blog/tags/android','571'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus','37b'),
    exact: true
  },
  {
    path: '/blog/tags/g-so-c',
    component: ComponentCreator('/blog/tags/g-so-c','04b'),
    exact: true
  },
  {
    path: '/blog/tags/library',
    component: ComponentCreator('/blog/tags/library','176'),
    exact: true
  },
  {
    path: '/blog/tags/ui',
    component: ComponentCreator('/blog/tags/ui','cb5'),
    exact: true
  },
  {
    path: '/projects',
    component: ComponentCreator('/projects','0e4'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','b53'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs','5b7'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/ArraysSortingSearching',
        component: ComponentCreator('/docs/dsa/ArraysSortingSearching','8c3'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/BitManipulation',
        component: ComponentCreator('/docs/dsa/BitManipulation','d85'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/Counting',
        component: ComponentCreator('/docs/dsa/Counting','22d'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/CppAndSTL',
        component: ComponentCreator('/docs/dsa/CppAndSTL','97d'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/DisjointSets',
        component: ComponentCreator('/docs/dsa/DisjointSets','7c6'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/FenwickTrees',
        component: ComponentCreator('/docs/dsa/FenwickTrees','a20'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/GraphShortestPath',
        component: ComponentCreator('/docs/dsa/GraphShortestPath','2c1'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/GraphTraversalAndMst',
        component: ComponentCreator('/docs/dsa/GraphTraversalAndMst','a9d'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/Heaps',
        component: ComponentCreator('/docs/dsa/Heaps','d68'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/LinkedList',
        component: ComponentCreator('/docs/dsa/LinkedList','985'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/MathsI',
        component: ComponentCreator('/docs/dsa/MathsI','f01'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/OrderStatistics',
        component: ComponentCreator('/docs/dsa/OrderStatistics','14c'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/PrimeNumbers',
        component: ComponentCreator('/docs/dsa/PrimeNumbers','943'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/SegmentTrees',
        component: ComponentCreator('/docs/dsa/SegmentTrees','001'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/StringAlgorithms',
        component: ComponentCreator('/docs/dsa/StringAlgorithms','3d9'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/dsa/Trees',
        component: ComponentCreator('/docs/dsa/Trees','952'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/mobile-app-dev/AndroidStudioShortcuts',
        component: ComponentCreator('/docs/mobile-app-dev/AndroidStudioShortcuts','c44'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/mobile-app-dev/Apps',
        component: ComponentCreator('/docs/mobile-app-dev/Apps','1f6'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/mobile-app-dev/Architecture',
        component: ComponentCreator('/docs/mobile-app-dev/Architecture','d11'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/mobile-app-dev/kotlin-flows',
        component: ComponentCreator('/docs/mobile-app-dev/kotlin-flows','20f'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/mobile-app-dev/UiUx',
        component: ComponentCreator('/docs/mobile-app-dev/UiUx','b4b'),
        exact: true,
        sidebar: "docs"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/','627'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
