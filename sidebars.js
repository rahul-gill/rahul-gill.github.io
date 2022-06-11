module.exports = {
  docs: [
    {
      type: "doc",
      id: "contents",
    },
    {
      type: "category",
      label: "Mobile Development",
      items: [
        "mobile-app-dev/kotlin-flows",
        "mobile-app-dev/Apps",
        "mobile-app-dev/Architecture",
        "mobile-app-dev/UiUx",
        "mobile-app-dev/AndroidStudioShortcuts"
      ],
    },
    {
      type: "category",
      label: "DSA",
      items: [
        "dsa/CppAndSTL",
        "dsa/ArraysSortingSearching",
        "dsa/OrderStatistics",
        "dsa/Heaps",
        "dsa/StringAlgorithms",
        "dsa/LinkedList",
        "dsa/Trees",
        "dsa/GraphTraversalAndMst",
        "dsa/GraphShortestPath",
        {
          Maths: ["dsa/MathsI","dsa/PrimeNumbers","dsa/Counting",],
        },
        "dsa/BitManipulation",
        {
          "Other Data Structures": ["dsa/SegmentTrees","dsa/DisjointSets","dsa/FenwickTrees",]
        },
      ],
    },
  ],
};
