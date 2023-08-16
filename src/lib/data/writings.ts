import {basename} from "path";
import {slugify} from "$lib/utils/slugify";
import type {ComponentType} from "svelte";
import type {WritingDataResult} from "../../routes/blog/[slug]/+page";


export type WritingPreview = {
    title: string;
    slug: string;
    description: string;
    datetime: string;
    tags: string[];
};

export function getBlogPostsWithTag(tag: string) {
    return getBlogPosts().filter(
        (item) => item.tags
            .map((tag) => slugify(tag))
            .includes(tag)
    )
}

export function getNLatestPosts(count: number){
    return getBlogPosts().slice(0, count)
}

export function getBlogPosts(): WritingPreview[] {
    const svxFiles = import.meta.glob('../../writings/*.svx', {eager: true});

    return Object.entries(svxFiles)
        .filter(([path]) => {
            const fileIsHidden = basename(path).startsWith('_');
            return !fileIsHidden;
        })
        .map(([path, data]) => {
            const {metadata} = data as { metadata: Omit<WritingPreview, 'slug'> };

            const {title, description, datetime, tags} = metadata;

            return {
                title,
                description,
                datetime,
                tags,
                slug: basename(path, '.svx')
            };
        })
        .sort(
            ({datetime: firstDatetime}, {datetime: secondDatetime}) =>
                -firstDatetime.localeCompare(secondDatetime)
        );
}