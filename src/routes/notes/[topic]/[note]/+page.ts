import type {PageLoad} from './$types';
import type {ComponentType} from 'svelte';
import {getNote} from "$lib/data/notes";

export const load: PageLoad = async ({params}) => {
    const note = getNote(params.topic, params.note);
    const path = `../../${note.path}`;
    console.log(path)
    const { default: content} = (await import(path)) as { default: ComponentType; };

    return {
        ...note,
        content
    };
};