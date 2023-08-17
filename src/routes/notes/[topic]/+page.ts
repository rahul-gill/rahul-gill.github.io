import type {PageLoad} from './$types';
import {getNotesInTopic} from "$lib/data/notes";

export const load: PageLoad = ({params: {topic}}) => {
    return getNotesInTopic(topic)
};

