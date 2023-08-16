import type {PageServerLoad} from './$types';
import {getNotesInTopic} from "$lib/data/notes";

export const load: PageServerLoad = ({params}) => {
    return {
        notes: getNotesInTopic(params.topic)
    };
};