import {getNLatestPosts,} from "$lib/data/writings";
import type {WritingPreview} from "$lib/data/writings";
import type {PageServerLoad} from './$types';

type GetResult = {
    articles: WritingPreview[];
};



export const load: PageServerLoad<GetResult> = () => {
    const blogPosts = getNLatestPosts(4);

    return {
        articles: blogPosts
    };
};
