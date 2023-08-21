import type {PageLoad} from './$types';
import {getNote, getNotesInTopicAroundANote} from "$lib/data/notes";

export const load: PageLoad = async ({params}) => {
    return {
        note: getNote(params.topic, params.note),
        ...getNotesInTopicAroundANote(params.topic, params.note)
    }
};

