import {getBlogPosts} from "$lib/data/writings";
import type {WritingPreview} from "$lib/data/writings";
import type {PageServerLoad} from './$types';

type GetResult = {
    articles: WritingPreview[];
};

export const load: PageServerLoad<GetResult> = () => {
    const blogPosts = getBlogPosts();

    return {
        articles: blogPosts
    };
};


