import type { RequestHandler } from './$types';
import { Feed } from 'feed';
import {getBlogPosts} from "$lib/data/writings";
import {WebsiteData} from "$lib/data/websiteData";

// To also prerender this *page*, as SvelteKit treats it as a page regarding prerendering.
export const prerender = true;

export const GET: RequestHandler = async ({setHeaders}) => {
    const blogPosts = getBlogPosts();

    const feed = new Feed({
        title: WebsiteData.userName,
        description: WebsiteData.rssDescription,
        id: WebsiteData.websiteAddress, // The id is used by RSS readers to identify the feed.
        link: WebsiteData.websiteAddress,
        language: 'en',
        feedLinks: {
            atom: `${WebsiteData.websiteAddress}/feed.xml`
        },
        copyright: '',
        author: {
            name: WebsiteData.userName,
            email: WebsiteData.userEmailAddress
        }
    });

    for (const blogPost of blogPosts) {
        const href = `${WebsiteData.websiteAddress}/writing/${blogPost.slug}/`;

        feed.addItem({
            id: href,
            title: blogPost.title,
            link: href,
            date: new Date(blogPost.datetime),
            description: blogPost.description,
            content: (await import(`../../writings/${blogPost.slug}.svx`)).default.render().html
        });
    }

    setHeaders({
        'Content-Type': 'application/atom+xml'
    });

    return new Response(feed.atom1());
};