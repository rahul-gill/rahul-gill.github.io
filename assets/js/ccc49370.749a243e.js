"use strict";(self.webpackChunkrahul_gill_github_io=self.webpackChunkrahul_gill_github_io||[]).push([[6103],{8665:function(e,t,a){a.d(t,{Z:function(){return h}});var l=a(3366),n=a(7294),r=a(6010),i=a(2600),s=a(9960),o="sidebar_a9qW",m="sidebarItemTitle_uKok",c="sidebarItemList_Kvuv",d="sidebarItem_CF0Q",u="sidebarItemLink_miNk",g="sidebarItemLinkActive_RRTD",v=a(5999);function b(e){var t=e.sidebar;return 0===t.items.length?null:n.createElement("nav",{className:(0,r.Z)(o,"thin-scrollbar"),"aria-label":(0,v.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},n.createElement("div",{className:(0,r.Z)(m,"margin-bottom--md")},t.title),n.createElement("ul",{className:c},t.items.map((function(e){return n.createElement("li",{key:e.permalink,className:d},n.createElement(s.Z,{isNavLink:!0,to:e.permalink,className:u,activeClassName:g},e.title))}))))}var p=["sidebar","toc","children"];function h(e){var t=e.sidebar,a=e.toc,s=e.children,o=(0,l.Z)(e,p),m=t&&t.items.length>0;return n.createElement(i.Z,o,n.createElement("div",{className:"container margin-vert--lg"},n.createElement("div",{className:"row"},m&&n.createElement("aside",{className:"col col--3"},n.createElement(b,{sidebar:t})),n.createElement("main",{className:(0,r.Z)("col",{"col--7":m,"col--9 col--offset-1":!m}),itemScope:!0,itemType:"http://schema.org/Blog"},s),a&&n.createElement("div",{className:"col col--2"},a))))}},9360:function(e,t,a){a.r(t),a.d(t,{default:function(){return b}});var l=a(7294),n=a(8665),r=a(2544),i=a(7462),s=a(5999),o=a(1750);function m(e){var t=e.nextItem,a=e.prevItem;return l.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,s.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"})},l.createElement("div",{className:"pagination-nav__item"},a&&l.createElement(o.Z,(0,i.Z)({},a,{subLabel:l.createElement(s.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post"},"Newer Post")}))),l.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&l.createElement(o.Z,(0,i.Z)({},t,{subLabel:l.createElement(s.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post"},"Older Post")}))))}var c=a(5979),d=a(1575),u=a(6010);function g(e){var t,a=e.content,n=a.assets,r=a.metadata,i=r.title,s=r.description,o=r.date,m=r.tags,d=r.authors,u=r.frontMatter,g=u.keywords,v=null!=(t=n.image)?t:u.image;return l.createElement(c.d,{title:i,description:s,keywords:g,image:v},l.createElement("meta",{property:"og:type",content:"article"}),l.createElement("meta",{property:"article:published_time",content:o}),d.some((function(e){return e.url}))&&l.createElement("meta",{property:"article:author",content:d.map((function(e){return e.url})).filter(Boolean).join(",")}),m.length>0&&l.createElement("meta",{property:"article:tag",content:m.map((function(e){return e.label})).join(",")}))}function v(e){var t=e.content,a=e.sidebar,i=t.assets,s=t.metadata,o=s.nextItem,c=s.prevItem,u=s.frontMatter,g=u.hide_table_of_contents,v=u.toc_min_heading_level,b=u.toc_max_heading_level;return l.createElement(n.Z,{sidebar:a,toc:!g&&t.toc&&t.toc.length>0?l.createElement(d.Z,{toc:t.toc,minHeadingLevel:v,maxHeadingLevel:b}):void 0},l.createElement(r.Z,{frontMatter:u,assets:i,metadata:s,isBlogPostPage:!0},l.createElement(t,null)),(o||c)&&l.createElement(m,{nextItem:o,prevItem:c}))}function b(e){return l.createElement(c.FG,{className:(0,u.Z)(c.kM.wrapper.blogPages,c.kM.page.blogPostPage)},l.createElement(g,e),l.createElement(v,e))}},1575:function(e,t,a){a.d(t,{Z:function(){return c}});var l=a(7462),n=a(3366),r=a(7294),i=a(6010),s=a(5002),o="tableOfContents_cNA8",m=["className"];function c(e){var t=e.className,a=(0,n.Z)(e,m);return r.createElement("div",{className:(0,i.Z)(o,"thin-scrollbar",t)},r.createElement(s.Z,(0,l.Z)({},a,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},5002:function(e,t,a){a.d(t,{Z:function(){return m}});var l=a(7462),n=a(3366),r=a(7294),i=a(5979),s=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function o(e){var t=e.toc,a=e.className,l=e.linkClassName,n=e.isChild;return t.length?r.createElement("ul",{className:n?void 0:a},t.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,className:null!=l?l:void 0,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(o,{isChild:!0,toc:e.children,className:a,linkClassName:l}))}))):null}function m(e){var t=e.toc,a=e.className,m=void 0===a?"table-of-contents table-of-contents__left-border":a,c=e.linkClassName,d=void 0===c?"table-of-contents__link":c,u=e.linkActiveClassName,g=void 0===u?void 0:u,v=e.minHeadingLevel,b=e.maxHeadingLevel,p=(0,n.Z)(e,s),h=(0,i.LU)(),E=null!=v?v:h.tableOfContents.minHeadingLevel,f=null!=b?b:h.tableOfContents.maxHeadingLevel,_=(0,i.b9)({toc:t,minHeadingLevel:E,maxHeadingLevel:f}),N=(0,r.useMemo)((function(){if(d&&g)return{linkClassName:d,linkActiveClassName:g,minHeadingLevel:E,maxHeadingLevel:f}}),[d,g,E,f]);return(0,i.Si)(N),r.createElement(o,(0,l.Z)({toc:_,className:m,linkClassName:d},p))}},2544:function(e,t,a){a.d(t,{Z:function(){return u}});var l=a(7294),n=a(6010),r=a(3905),i=a(5999),s=a(9960),o=a(5979),m=a(3384),c=a(6753),d={blogPostData:"blogPostData_Vfxe",blogPostDetailsFull:"blogPostDetailsFull_enUA"};var u=function(e){var t,a,u,g=(a=(0,o.c2)().selectMessage,function(e){var t=Math.ceil(e);return a(t,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),v=e.children,b=e.frontMatter,p=e.metadata,h=e.truncated,E=e.isBlogPostPage,f=void 0!==E&&E,_=p.date,N=p.formattedDate,k=p.permalink,Z=p.tags,L=p.readingTime,C=p.title,P=p.editUrl,T=b.author,I=(b.image,b.keywords,b.author_url||b.authorURL),x=b.author_title||b.authorTitle,w=b.author_image_url||b.authorImageURL;return l.createElement(l.Fragment,null,l.createElement("article",{className:f?void 0:"margin-bottom--xl"},(u=f?"h1":"h2",l.createElement("header",null,l.createElement(u,{className:d.blogPostTitle},f?C:l.createElement(s.Z,{to:k},C)),l.createElement("div",{className:(0,n.Z)(d.blogPostData,"margin-vert--md")},l.createElement("time",{dateTime:_},N),L&&l.createElement(l.Fragment,null," \xb7 ",g(L))),l.createElement("div",{className:"avatar margin-vert--md"},w&&l.createElement(s.Z,{className:"avatar__photo-link avatar__photo",href:I},l.createElement("img",{src:w,alt:T})),l.createElement("div",{className:"avatar__intro"},T&&l.createElement(l.Fragment,null,l.createElement("div",{className:"avatar__name"},l.createElement(s.Z,{href:I},T)),l.createElement("small",{className:"avatar__subtitle"},x)))))),l.createElement("div",{className:"markdown"},l.createElement(r.Zo,{components:m.Z},v)),(Z.length>0||h)&&l.createElement("footer",{className:(0,n.Z)("row docusaurus-mt-lg",(t={},t[d.blogPostDetailsFull]=f,t))},Z.length>0&&l.createElement("div",{className:"col"},l.createElement("b",null,l.createElement(i.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),Z.map((function(e){var t=e.label,a=e.permalink;return l.createElement(s.Z,{key:a,className:"margin-horiz--sm",to:a},t)}))),f&&P&&l.createElement("div",{className:"col margin-top--sm"},l.createElement(c.Z,{editUrl:P})),!f&&h&&l.createElement("div",{className:"col text--right"},l.createElement(s.Z,{to:p.permalink,"aria-label":"Read more about "+C},l.createElement("b",null,l.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More")))))))}}}]);