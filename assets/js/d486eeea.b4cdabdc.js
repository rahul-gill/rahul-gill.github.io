(self.webpackChunkrahul_gill_github_io=self.webpackChunkrahul_gill_github_io||[]).push([[1561],{9899:function(a,e,t){"use strict";t.r(e),t.d(e,{assets:function(){return c},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return i},metadata:function(){return N},toc:function(){return o}});var n=t(7462),s=t(3366),m=(t(7294),t(3905)),r=t(3456),p=["components"],i={title:"Segment Trees"},l=void 0,N={unversionedId:"dsa/SegmentTrees",id:"dsa/SegmentTrees",title:"Segment Trees",description:"Segment Trees",source:"@site/docs/dsa/15. SegmentTrees.md",sourceDirName:"dsa",slug:"/dsa/SegmentTrees",permalink:"/docs/dsa/SegmentTrees",tags:[],version:"current",sidebarPosition:15,frontMatter:{title:"Segment Trees"},sidebar:"docs",previous:{title:"BitManipulation",permalink:"/docs/dsa/BitManipulation"},next:{title:"Disjoint Sets",permalink:"/docs/dsa/DisjointSets"}},c={},o=[{value:"Segment Trees",id:"segment-trees",level:2},{value:"memory efficient implementation",id:"memory-efficient-implementation",level:2},{value:"Lazy Propagation for range updates",id:"lazy-propagation-for-range-updates",level:2}],k={toc:o};function h(a){var e=a.components,t=(0,s.Z)(a,p);return(0,m.kt)("wrapper",(0,n.Z)({},k,t,{components:e,mdxType:"MDXLayout"}),(0,m.kt)("h2",{id:"segment-trees"},"Segment Trees"),(0,m.kt)("ul",null,(0,m.kt)("li",{parentName:"ul"},"require about ",(0,m.kt)("span",{parentName:"li",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mo",{parentName:"mrow"},"\u223c"),(0,m.kt)("mn",{parentName:"mrow"},"4"),(0,m.kt)("mi",{parentName:"mrow"},"n")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\sim 4n")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.36687em",verticalAlign:"0em"}}),(0,m.kt)("span",{parentName:"span",className:"mrel"},"\u223c"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}})),(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.64444em",verticalAlign:"0em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},"4"),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"n")))))," space for array of size ",(0,m.kt)("span",{parentName:"li",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mi",{parentName:"mrow"},"n")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"n")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"n")))))),(0,m.kt)("li",{parentName:"ul"},"the time complexity of this construction is ",(0,m.kt)("span",{parentName:"li",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mi",{parentName:"mrow",mathvariant:"script"},"O"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,m.kt)("mi",{parentName:"mrow"},"n"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{O}(n)")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathcal",style:{marginRight:"0.02778em"}},"O")),(0,m.kt)("span",{parentName:"span",className:"mopen"},"("),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"n"),(0,m.kt)("span",{parentName:"span",className:"mclose"},")"))))),", assuming that the merge operation is constant time(recursively building it)\n"),(0,m.kt)("li",{parentName:"ul"},"sum queries three cases",(0,m.kt)("ul",{parentName:"li"},(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("p",{parentName:"li"},"the current segment is same as query segment")),(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("p",{parentName:"li"},"the query segment completely fall in either left or right child segment")),(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("p",{parentName:"li"},"query segment intersects with both children segments")),(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("p",{parentName:"li"},"why sum queries are ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mi",{parentName:"mrow",mathvariant:"script"},"O"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,m.kt)("mi",{parentName:"mrow"},"log"),(0,m.kt)("mo",{parentName:"mrow"},"\u2061"),(0,m.kt)("mi",{parentName:"mrow"},"n"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{O}(\\log n)")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathcal",style:{marginRight:"0.02778em"}},"O")),(0,m.kt)("span",{parentName:"span",className:"mopen"},"("),(0,m.kt)("span",{parentName:"span",className:"mop"},"lo",(0,m.kt)("span",{parentName:"span",style:{marginRight:"0.01389em"}},"g")),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"n"),(0,m.kt)("span",{parentName:"span",className:"mclose"},")"))))),":"),(0,m.kt)(r.Mermaid,{config:{mermaid:{theme:"dark"}},chart:"flowchart TD;\n    a(left)\n    b(mid1)\n    bII(mid2)\n    c(right)\n    a --\x3e a1\n    a --\x3e a2\n    b --\x3e b1\n    b --\x3e b2\n    c --\x3e c1\n    c --\x3e c2\n    bII --\x3e b21\n    bII --\x3e b22\n\n",mdxType:"Mermaid"}),(0,m.kt)("p",{parentName:"li"},"since the range of sum queried will cover up the mid completely, it'll just return the result and won't do a recursive call. But the left and right can do recursive call. So even if there are four vertices in current level there will be <4 in next level. Hence proved by induction. So at most ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mn",{parentName:"mrow"},"4"),(0,m.kt)("mi",{parentName:"mrow"},"log"),(0,m.kt)("mo",{parentName:"mrow"},"\u2061"),(0,m.kt)("mi",{parentName:"mrow"},"n")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"4\\log n")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8888799999999999em",verticalAlign:"-0.19444em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},"4"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),(0,m.kt)("span",{parentName:"span",className:"mop"},"lo",(0,m.kt)("span",{parentName:"span",style:{marginRight:"0.01389em"}},"g")),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"n")))))," steps")))),(0,m.kt)("li",{parentName:"ul"},"update queries are also ",(0,m.kt)("span",{parentName:"li",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mi",{parentName:"mrow",mathvariant:"script"},"O"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,m.kt)("mi",{parentName:"mrow"},"log"),(0,m.kt)("mo",{parentName:"mrow"},"\u2061"),(0,m.kt)("mi",{parentName:"mrow"},"n"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{O}(\\log n)")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathcal",style:{marginRight:"0.02778em"}},"O")),(0,m.kt)("span",{parentName:"span",className:"mopen"},"("),(0,m.kt)("span",{parentName:"span",className:"mop"},"lo",(0,m.kt)("span",{parentName:"span",style:{marginRight:"0.01389em"}},"g")),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"n"),(0,m.kt)("span",{parentName:"span",className:"mclose"},")")))))),(0,m.kt)("li",{parentName:"ul"},"basic implementation\n")),(0,m.kt)("pre",null,(0,m.kt)("code",{parentName:"pre",className:"language-cpp"},"class SegmentTree{\nprivate:\n    int n, maxN, segTree[4*maxN];\n    inline int leftChild(int indx){ return indx*2; }\n    inline int rightChild(int indx){ return indx*2+1; }\n\n    void build(vector<int> arr, int tIndex=1, int tLeft=0, int tRight=n-1) {\n        if (tLeft == tRight) {  //in terminal node just do it\n            segTree[tIndex] = arr[tLeft];\n        } else {    //build the left and right child recursively and using them update the current node\n            int tMid = (tLeft + tRight) / 2;\n            build(arr, leftChild(tIndex), tLeft, tMid);\n            build(arr, rightChild(tIndex), tMid+1, tRight);\n            segTree[tIndex] = segTree[leftChild(tIndex)] + segTree[rightChild(tIndex)];\n        }\n    }\n\npublic:\n    SegmentTree(vector<int> arr, int pMaxN = -1){\n        n = arr.size();\n        maxN = (pMaxN == -1)? n : pMaxN;\n        build(arr);\n    }\n\n    int sumQuery(int tIndex, int tLeft, int tRight, int qLeft, int qRight) {\n        if (qLeft > qRight) \n            return 0;\n        if (qLeft == tLeft && qRight == tRight) {   //tree segment same as query segment\n            return segTree[tIndex];\n\n        }\n        //else just do the recursive thing\n        int tMid = (tLeft + tRight) / 2;\n        return sumQuery(leftChild(tIndex), tLeft, tMid, qLeft, min(qRight, tMid))\n            + sumQuery(rightChild(tIndex), tMid+1, tRight, max(qLeft, tMid+1), qRight);\n    }\n\n    void updateQuery(int tIndex, int tLeft, int tRight, int arrPos, int newVal) {\n        if (tLeft == tRight) {\n            segTree[tIndex] = newVal;//reached to the terminal\n        } else {\n            int tMid = (tLeft + tRight) / 2;\n            if (arrPos <= tMid)\n                update(leftChild(tIndex), tLeft, tMid, arrPos, newVal);\n            else\n                update(rightChild(tIndex), tMid+1, tRight, arrPos, newVal);\n            segTree[tIndex] = segTree[tIndex*2] + segTree[tIndex*2+1];\n        }\n    }\n\n}\n")),(0,m.kt)("h2",{id:"memory-efficient-implementation"},"memory efficient implementation"),(0,m.kt)("ul",null,(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("a",{parentName:"li",href:"https://youtu.be/Oq2E2yGadnU"},"video tutorial"))),(0,m.kt)("pre",null,(0,m.kt)("code",{parentName:"pre",className:"language-cpp"},"class SegmentTree {\npublic:\n    SegmentTree(int count) {\n        n = count;\n        data = vector<int>(2 * n, 0);\n    }\n\n    SegmentTree(vector<int> const &values) {\n        n = values.size();\n        data = vector<int>(2 * n);\n        copy(values.begin(), values.end(), data.begin() + n);\n        for (int idx = n - 1; idx > 0; idx--)\n            data[idx] = min(data[idx * 2], data[idx * 2 + 1]);//action\n    }\n\n    void update(int idx, int value) {\n        idx += n;\n        data[idx] = value;\n\n        while (idx > 1) {\n            idx /= 2;\n            data[idx] = min(data[2 * idx], data[2 * idx + 1]);//action\n        }\n    }\n\n    int minimum(int left, int right) { // [left, right)\n        int ret = INT_MAX;\n        left += n;\n        right += n;\n\n        while (left < right) {\n            if (left & 1) ret = min(ret, data[left++]);//action\n            if (right & 1) ret = min(ret, data[--right]);//action\n            left >>= 1;\n            right >>= 1;\n        }\n        return ret;\n    }\n\nprivate:\n    int n;\n    std::vector<int> data;\n};\n")),(0,m.kt)("ul",null,(0,m.kt)("li",{parentName:"ul"},"in place of action we can subtitute many things like sum, max, gcd, lcm etc.:",(0,m.kt)("ul",{parentName:"li"},(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("p",{parentName:"li"},"finding max and number of times it appears: the action would be"),(0,m.kt)("pre",{parentName:"li"},(0,m.kt)("code",{parentName:"pre",className:"language-cpp"},"pair<int, int> combine(pair<int, int> a, pair<int, int> b) {\n    if (a.first > b.first) \n        return a;\n    if (b.first > a.first)\n        return b;\n    return make_pair(a.first, a.second + b.second);\n}\n"))),(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("p",{parentName:"li"},"finding the ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("msup",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"msup"},"k"),(0,m.kt)("mrow",{parentName:"msup"},(0,m.kt)("mi",{parentName:"mrow"},"t"),(0,m.kt)("mi",{parentName:"mrow"},"h")))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"k^{th}")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.849108em",verticalAlign:"0em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03148em"}},"k"),(0,m.kt)("span",{parentName:"span",className:"msupsub"},(0,m.kt)("span",{parentName:"span",className:"vlist-t"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.849108em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-3.063em",marginRight:"0.05em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"t"),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"h")))))))))))))," zero"),(0,m.kt)("pre",{parentName:"li"},(0,m.kt)("code",{parentName:"pre",className:"language-cpp"},"int find_kth(int v, int tl, int tr, int k) {\n    if (k > t[v]) return -1;\n    if (tl == tr) return tl;\n\n    int tm = (tl + tr) / 2;\n    if (t[v*2] >= k) return find_kth(v*2, tl, tm, k);\n    else return find_kth(v*2+1, tm+1, tr, k - t[v*2]);\n}\n"))),(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("p",{parentName:"li"},"for x, find smallest index i such that the sum of the first i elements of the array is >=x: same idea as kth zero")),(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("p",{parentName:"li"},"for given x and range ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"["),(0,m.kt)("mi",{parentName:"mrow"},"l"),(0,m.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,m.kt)("mi",{parentName:"mrow"},"r"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"]")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"[l,r]")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,m.kt)("span",{parentName:"span",className:"mopen"},"["),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.01968em"}},"l"),(0,m.kt)("span",{parentName:"span",className:"mpunct"},","),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.02778em"}},"r"),(0,m.kt)("span",{parentName:"span",className:"mclose"},"]")))))," find smallest i such that ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mi",{parentName:"mrow"},"a"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"["),(0,m.kt)("mi",{parentName:"mrow"},"i"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"]"),(0,m.kt)("mo",{parentName:"mrow"},">"),(0,m.kt)("mi",{parentName:"mrow"},"x")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"a[i]\\gt x")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"a"),(0,m.kt)("span",{parentName:"span",className:"mopen"},"["),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"i"),(0,m.kt)("span",{parentName:"span",className:"mclose"},"]"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}}),(0,m.kt)("span",{parentName:"span",className:"mrel"},">"),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}})),(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"x")))))),(0,m.kt)("pre",{parentName:"li"},(0,m.kt)("code",{parentName:"pre",className:"language-cpp"},"int get_first(int v, int lv, int rv, int l, int r, int x) {\n    if(lv > r || rv < l) return -1;\n    if(l <= lv && rv <= r) {\n        if(t[v] <= x) return -1;\n        while(lv != rv) {\n            int mid = lv + (rv-lv)/2;\n            if(t[2*v] > x) {\n                v = 2*v;\n                rv = mid;\n            }else {\n                v = 2*v+1;\n                lv = mid+1;\n            }\n        }\n        return lv;\n    }\n\n    int mid = lv + (rv-lv)/2;\n    int rs = get_first(2*v, lv, mid, l, r, x);\n    if(rs != -1) return rs;\n    return get_first(2*v+1, mid+1, rv, l ,r, x);\n}\n"))),(0,m.kt)("li",{parentName:"ul"},(0,m.kt)("p",{parentName:"li"},"etc.etc."))))),(0,m.kt)("h2",{id:"lazy-propagation-for-range-updates"},"Lazy Propagation for range updates"),(0,m.kt)("ul",null,(0,m.kt)("li",{parentName:"ul"},"query: add ",(0,m.kt)("span",{parentName:"li",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mi",{parentName:"mrow"},"x")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"x")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"x")))))," to all numbers in segment ",(0,m.kt)("span",{parentName:"li",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"["),(0,m.kt)("mi",{parentName:"mrow"},"l"),(0,m.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,m.kt)("mi",{parentName:"mrow"},"r"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"]")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"[l,r]")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,m.kt)("span",{parentName:"span",className:"mopen"},"["),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.01968em"}},"l"),(0,m.kt)("span",{parentName:"span",className:"mpunct"},","),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.02778em"}},"r"),(0,m.kt)("span",{parentName:"span",className:"mclose"},"]"))))))))}h.isMDXComponent=!0},1748:function(a,e,t){var n={"./locale":9234,"./locale.js":9234};function s(a){var e=m(a);return t(e)}function m(a){if(!t.o(n,a)){var e=new Error("Cannot find module '"+a+"'");throw e.code="MODULE_NOT_FOUND",e}return n[a]}s.keys=function(){return Object.keys(n)},s.resolve=m,a.exports=s,s.id=1748}}]);