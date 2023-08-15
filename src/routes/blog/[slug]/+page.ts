import type {PageLoad} from './$types';
import type {ComponentType} from 'svelte';
import {slide} from "svelte/transition";

type WritingDataResult = {
    title: string;
    description: string;
    datetime: string;
    last_updated_datetime?: string;
    tags: string[];
    content: ComponentType;
};

export const load: PageLoad<WritingDataResult> = async ({params: {slug}}) => {
    const {
        metadata: { title, description, datetime, last_updated_datetime, tags },
        default: content
    } = (await import(`../../../writings/${slug}.svx`)) as {
        metadata: {
            title: string;
            description: string;
            datetime: string;
            last_updated_datetime?: string;
            tags: string[];
        };
        default: ComponentType;
    };

    return {
        title,
        description,
        datetime,
        last_updated_datetime,
        tags,
        content
    };
};