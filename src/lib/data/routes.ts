import {WebsiteData} from "#lib/data/websiteData";
import Mail from "#lib/icons/Mail.svelte";
import Rss from "#lib/icons/Rss.svelte";
import Github from "#lib/icons/Github.svelte";
import Twitter from "#lib/icons/Twitter.svelte";
import { resolve } from '$app/paths';

//avoid trailing slash
export const navBarTextLinks = [
    {
        href: resolve('about'),
        external: false,
        text: "About"
    },
    {
        href: resolve('projects'),
        external: false,
        text: "Projects"
    },
    {
        href: resolve('blog'),
        external: false,
        text: "Blog"
    },
    {
        href: resolve('notes'),
        external: false,
        text: "Notes"
    },
    {
        href: resolve('cv'),
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
        href: resolve('feed.xml'),
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