import {WebsiteData} from "$lib/data/websiteData";
import Mail from "$lib/icons/Mail.svelte";
import Rss from "$lib/icons/Rss.svelte";
import Github from "$lib/icons/Github.svelte";
import Twitter from "$lib/icons/Twitter.svelte";
import {base} from "$app/paths";

//avoid trailing slash
export const navBarTextLinks = [
    {
        href: `${base}/about`,
        external: false,
        text: "About"
    },
    {
        href: `${base}/projects`,
        external: false,
        text: "Projects"
    },
    {
        href: `${base}/blog`,
        external: false,
        text: "Blog"
    },
    {
        href: `${base}/notes`,
        external: false,
        text: "Notes"
    },
    {
        href: `${base}/cv`,
        external: true,
        text: "CV"
    }
];


export const navBarIconLinks = [
    {
        href: `mailto:${WebsiteData.userEmailAddress}`,
        text: 'Mail',
        external: true,
        icon: Mail
    },
    {
        href: `${base}/feed.xml`,
        text: 'RSS',
        external: true,
        icon: Rss
    },
    {
        text: "Github",
        href: "https://github.com/rahul-gill",
        icon: Github,
        external: true
    },
    {
        text: "Twitter",
        href: "https://twitter.com/artisticent001",
        icon: Twitter,
        external: true
    }
];