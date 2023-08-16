import {slugify} from "$lib/utils/slugify";

function parsePath(input: string): string[] {
    const pattern = /\/([^/]+)(?=\/[^/]*\.svx$)/g;
    const matches = input.match(pattern);

    if (matches) {
        return matches.map(match => match.slice(1));
    } else {
        return [];
    }
}

export type NoteType = {
    title: string,
    pathSegments: string[],
    topic: string,
    path: string
};
export function getAllNotes(): NoteType[] {
    return Object.entries(import.meta.glob('../../notes/**/*.svx', {eager: true}))
        .map(([path, data]) => {
            const {metadata} = data as { metadata: { title: string, topic: string } };
            const {title} = metadata;
            const pathSegments = parsePath(path)
            return {
                title,
                pathSegments,
                topic: pathSegments[0],
                path
            };
        })
}


export function getNotesTopicsList() {
    return getAllNotes().map(({topic}) => {
        return {
            title: topic,
            slug: slugify(topic)
        };
    })
}

export function getNotesInTopic(topicSlug: string){
    return getAllNotes().filter(({topic}) => slugify(topic) === topicSlug).map(({title, topic}) => {
        return {
            title,
            slug: `${slugify(topic)}/${slugify(title)}`
        }
    });
}

export function getTopicNameFromSlug(topicSlug: string){
    return getAllNotes().find(({topic}) => slugify(topic) == topicSlug)?.topic;
}

export function getNote(topicSlug: string, noteSlug: string){
    return getAllNotes().find(({topic, title}) => {
        return topicSlug == slugify(topic) && noteSlug == slugify(title)
    })!!;
}