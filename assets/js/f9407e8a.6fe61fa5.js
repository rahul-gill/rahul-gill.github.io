"use strict";(self.webpackChunkrahul_gill_github_io=self.webpackChunkrahul_gill_github_io||[]).push([[6325],{3905:(a,e,t)=>{t.d(e,{Zo:()=>N,kt:()=>k});var n=t(7294);function s(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function m(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(a);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),t.push.apply(t,n)}return t}function r(a){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?m(Object(t),!0).forEach((function(e){s(a,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(t,e))}))}return a}function p(a,e){if(null==a)return{};var t,n,s=function(a,e){if(null==a)return{};var t,n,s={},m=Object.keys(a);for(n=0;n<m.length;n++)t=m[n],e.indexOf(t)>=0||(s[t]=a[t]);return s}(a,e);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(a);for(n=0;n<m.length;n++)t=m[n],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(a,t)&&(s[t]=a[t])}return s}var i=n.createContext({}),l=function(a){var e=n.useContext(i),t=e;return a&&(t="function"==typeof a?a(e):r(r({},e),a)),t},N=function(a){var e=l(a.components);return n.createElement(i.Provider,{value:e},a.children)},c={inlineCode:"code",wrapper:function(a){var e=a.children;return n.createElement(n.Fragment,{},e)}},o=n.forwardRef((function(a,e){var t=a.components,s=a.mdxType,m=a.originalType,i=a.parentName,N=p(a,["components","mdxType","originalType","parentName"]),o=l(t),k=s,h=o["".concat(i,".").concat(k)]||o[k]||c[k]||m;return t?n.createElement(h,r(r({ref:e},N),{},{components:t})):n.createElement(h,r({ref:e},N))}));function k(a,e){var t=arguments,s=e&&e.mdxType;if("string"==typeof a||s){var m=t.length,r=new Array(m);r[0]=o;var p={};for(var i in e)hasOwnProperty.call(e,i)&&(p[i]=e[i]);p.originalType=a,p.mdxType="string"==typeof a?a:s,r[1]=p;for(var l=2;l<m;l++)r[l]=t[l];return n.createElement.apply(null,r)}return n.createElement.apply(null,t)}o.displayName="MDXCreateElement"},6212:(a,e,t)=>{t.r(e),t.d(e,{assets:()=>i,contentTitle:()=>r,default:()=>c,frontMatter:()=>m,metadata:()=>p,toc:()=>l});var n=t(7462),s=(t(7294),t(3905));const m={title:"Binary Indexed Tree"},r=void 0,p={unversionedId:"dsa/FenwickTrees",id:"dsa/FenwickTrees",title:"Binary Indexed Tree",description:"Binary Indexed Tree/ Fenwick Tree",source:"@site/docs/dsa/17. FenwickTrees.md",sourceDirName:"dsa",slug:"/dsa/FenwickTrees",permalink:"/notes/dsa/FenwickTrees",draft:!1,editUrl:"https://github.com/rahul-gill/rahul-gill.github.io/issues/new?title=Problem+on+page+deployed+at+/notes/dsa/FenwickTrees&body=%5Bfile%20to%20be%20edited%5D%28https%3A%2F%2Fgithub.com%2Frahul-gill%2Frahul-gill.github.io%2Ftree%2Fmaster%2Fdocs%2Fdsa/17. FenwickTrees.md%29",tags:[],version:"current",sidebarPosition:17,frontMatter:{title:"Binary Indexed Tree"},sidebar:"docs",previous:{title:"Disjoint Sets",permalink:"/notes/dsa/DisjointSets"}},i={},l=[{value:"Binary Indexed Tree/ Fenwick Tree",id:"binary-indexed-tree-fenwick-tree",level:2}],N={toc:l};function c(a){let{components:e,...t}=a;return(0,s.kt)("wrapper",(0,n.Z)({},N,t,{components:e,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"binary-indexed-tree-fenwick-tree"},"Binary Indexed Tree/ Fenwick Tree"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"for ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"f")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"f")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8889em",verticalAlign:"-0.1944em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f")))))," be some ",(0,s.kt)("em",{parentName:"li"},"reversible")," function and ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"A")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A")))))," be an array of integers of length ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"N")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"N")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10903em"}},"N")))))," Fenwick tree can",(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},"calculates the value of ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"f")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"f")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8889em",verticalAlign:"-0.1944em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f")))))," in the given range ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"["),(0,s.kt)("mi",{parentName:"mrow"},"l"),(0,s.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,s.kt)("mi",{parentName:"mrow"},"r"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"]")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"[l,r]")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.kt)("span",{parentName:"span",className:"mopen"},"["),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.01968em"}},"l"),(0,s.kt)("span",{parentName:"span",className:"mpunct"},","),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.02778em"}},"r"),(0,s.kt)("span",{parentName:"span",className:"mclose"},"]")))))," (i.e. ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"f"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,s.kt)("msub",{parentName:"mrow"},(0,s.kt)("mi",{parentName:"msub"},"A"),(0,s.kt)("mi",{parentName:"msub"},"l")),(0,s.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,s.kt)("msub",{parentName:"mrow"},(0,s.kt)("mi",{parentName:"msub"},"A"),(0,s.kt)("mrow",{parentName:"msub"},(0,s.kt)("mi",{parentName:"mrow"},"l"),(0,s.kt)("mo",{parentName:"mrow"},"+"),(0,s.kt)("mn",{parentName:"mrow"},"1"))),(0,s.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,s.kt)("mo",{parentName:"mrow"},"\u2026"),(0,s.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,s.kt)("msub",{parentName:"mrow"},(0,s.kt)("mi",{parentName:"msub"},"A"),(0,s.kt)("mi",{parentName:"msub"},"r")),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"f(A_l,A_{l+1},\\ldots,A_r))")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),(0,s.kt)("span",{parentName:"span",className:"mopen"},"("),(0,s.kt)("span",{parentName:"span",className:"mord"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"),(0,s.kt)("span",{parentName:"span",className:"msupsub"},(0,s.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3361em"}},(0,s.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,s.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,s.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.01968em"}},"l")))),(0,s.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,s.kt)("span",{parentName:"span"})))))),(0,s.kt)("span",{parentName:"span",className:"mpunct"},","),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mord"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"),(0,s.kt)("span",{parentName:"span",className:"msupsub"},(0,s.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3361em"}},(0,s.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,s.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,s.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.01968em"}},"l"),(0,s.kt)("span",{parentName:"span",className:"mbin mtight"},"+"),(0,s.kt)("span",{parentName:"span",className:"mord mtight"},"1"))))),(0,s.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.2083em"}},(0,s.kt)("span",{parentName:"span"})))))),(0,s.kt)("span",{parentName:"span",className:"mpunct"},","),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"minner"},"\u2026"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mpunct"},","),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mord"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"),(0,s.kt)("span",{parentName:"span",className:"msupsub"},(0,s.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.1514em"}},(0,s.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,s.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,s.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.02778em"}},"r")))),(0,s.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,s.kt)("span",{parentName:"span"})))))),(0,s.kt)("span",{parentName:"span",className:"mclose"},"))")))))," in ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow",mathvariant:"script"},"O"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,s.kt)("mi",{parentName:"mrow"},"log"),(0,s.kt)("mo",{parentName:"mrow"},"\u2061"),(0,s.kt)("mrow",{parentName:"mrow"}),(0,s.kt)("mi",{parentName:"mrow"},"n"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{O}(\\log{}n)")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathcal",style:{marginRight:"0.02778em"}},"O"),(0,s.kt)("span",{parentName:"span",className:"mopen"},"("),(0,s.kt)("span",{parentName:"span",className:"mop"},"lo",(0,s.kt)("span",{parentName:"span",style:{marginRight:"0.01389em"}},"g")),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mord"}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"n"),(0,s.kt)("span",{parentName:"span",className:"mclose"},")")))))," time"),(0,s.kt)("li",{parentName:"ul"},"can update its elements in ",(0,s.kt)("span",{parentName:"li",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow",mathvariant:"script"},"O"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,s.kt)("mi",{parentName:"mrow"},"log"),(0,s.kt)("mo",{parentName:"mrow"},"\u2061"),(0,s.kt)("mrow",{parentName:"mrow"}),(0,s.kt)("mi",{parentName:"mrow"},"n"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{O}(\\log{}n)")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathcal",style:{marginRight:"0.02778em"}},"O"),(0,s.kt)("span",{parentName:"span",className:"mopen"},"("),(0,s.kt)("span",{parentName:"span",className:"mop"},"lo",(0,s.kt)("span",{parentName:"span",style:{marginRight:"0.01389em"}},"g")),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mord"}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"n"),(0,s.kt)("span",{parentName:"span",className:"mclose"},")")))))," time"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=uSFzHCZ4E-8"},"explaination video"))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"template<typename T> class FenwickTree {\nprivate:\n    vector<T> ftree;\n    inline int lsbit(int a){return (a & -a);}\npublic:\n    void build(const vector<T> &arr) {\n        int arr_size = arr.size();                   \n        ftree.assign(arr_size+1, 0);\n        copy(arr.begin(), arr.end(), ftree.begin()+1);\n        for (int i = 1; i <= arr_size; ++i) {                     \n            if (i+lsbit(i) <= arr_size)                    \n                ftree[i+lsbit(i)] += ftree[i];                \n        }\n    }\n    FenwickTree(int m) { ftree.assign(m+1, 0); }\n    FenwickTree(const vector<T> &f) { build(f); }\n\n    //RSQ(1, j)\n    T rsq(int j) {   \n        T sum = 0;\n        for (; j; j -= lsbit(j))\n            sum += ftree[j];\n        return sum;\n    }\n    T rsq(int i, int j) { \n        return rsq(j) - rsq(i-1); \n    }\n\n    // updates value of the i-th element by v (v can be +ve/inc or -ve/dec)\n    void update(int i, T v) {\n        for (; i < ftree.size(); i += lsbit(i))\n            ftree[i] += v;\n    }\n};\n")))}c.isMDXComponent=!0}}]);