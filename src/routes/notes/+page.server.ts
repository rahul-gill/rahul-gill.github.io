import type {PageServerLoad} from './$types';
import {getNotesTopics} from "$lib/data/notes";


export const load: PageServerLoad = () => {

    return {
        topics: getNotesTopics()
    };
};