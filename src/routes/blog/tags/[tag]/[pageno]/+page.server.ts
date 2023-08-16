import type {WritingPreview} from "$lib/data/writings";
import type {PageServerLoad} from './$types';
import {getBlogPostsWithTag} from "$lib/data/writings";

type GetResult = {
    articles: WritingPreview[];
};

export const load: PageServerLoad<GetResult> = ( {params} ) => {
    const blogPosts = getBlogPostsWithTag(params.tag);

    return {
        articles: blogPosts
    };
};
