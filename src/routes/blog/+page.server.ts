import {basename} from 'path';
import type { PageServerLoad } from './$types';
import {getBlogPosts} from "$lib/data/writings";
import type {WritingPreview} from "$lib/data/writings";

type GetResult = {
    articles: WritingPreview[];
};

export const load: PageServerLoad<GetResult> = () => {
    const blogPosts = getBlogPosts();

    return {
        articles: blogPosts
    };
};


