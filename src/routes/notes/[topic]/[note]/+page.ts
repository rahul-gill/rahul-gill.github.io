import type {PageLoad} from './$types';
import {getNote} from "$lib/data/notes";

export const load: PageLoad = async ({params}) => {
    return getNote(params.topic, params.note)
};

