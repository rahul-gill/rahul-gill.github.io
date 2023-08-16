import type {PageServerLoad} from './$types';
import {getNotesTopicsList} from "$lib/data/notes";

export const load: PageServerLoad = () => {
    return {
        topics: getNotesTopicsList()
    };
};