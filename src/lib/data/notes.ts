import type {ComponentType} from "svelte";

export function getNotesTopics(){
    return Object.entries(import.meta.glob('../../notes/*/index.svx', {eager: true}))
        .map(([path, data]) => {
            const {metadata} = data as { metadata: { title: string } };


            return {
                title: metadata.title,
                slug: path.slice(0, path.length - 'index.svx$'.length)
            };
        })
}

export function getTopicTitle(list: [string, unknown][], topicSlug: string){
    return list.filter(([path, data]) => path.includes(`${topicSlug}/index.svx`))
        .map(([path, data]) => {
            const {metadata} = data as { metadata: { title: string } };
            return metadata.title;
        })[0];
}

export function getNotesInTopic(topicSlug: string){
    const list =  Object.entries(import.meta.glob(`../../notes/**/*.svx`, {eager: true}))
    return {
        topicTitle: getTopicTitle(list, topicSlug),
        notes: list.filter(([path, data]) => path.includes(topicSlug) && !path.includes('index.svx'))
            .map(([path, data]) => {
                const {metadata} = data as { metadata: { title: string, index: string } };
                return {
                    title: metadata.title,
                    slug: path.slice('../..notes/'.length + 1, path.length - '.svx'.length),
                    index: parseInt(metadata.index)
                };
            })
            .sort((a, b) => a.index - b.index)
    }
}

export function getNotesInTopicAroundANote(topicSlug: string, noteSlug: string){
    const allNotes = getNotesInTopic(topicSlug)
    const currentNoteIndex = allNotes.notes.findIndex(note =>
        note.slug === `${topicSlug}/${noteSlug}`
    );
    const notesAround = []
    for(let i=-1; i<=1; ++i){
        
        const index = currentNoteIndex + i;
        if(index >=0 && index < allNotes.notes.length){
            const note = allNotes.notes[index];
            notesAround.push({
                title: note.title,
                slug: note.slug,
                noteNumber: index + 1,
                isCurrent: index == currentNoteIndex
            })
        }
    }
    return  {
        notesAround,
        haveNotesBefore: notesAround[0].noteNumber - 1,
        haveNotesAfter: allNotes.notes.length - notesAround[notesAround.length-1].noteNumber,
        topicSlug
    }
}

export function getNote(topicSlug: string, noteSlug: string){
    const list = Object.entries(import.meta.glob(`../../notes/**/*.svx`, {eager: true}))
    return list.filter(([path, data]) => path.includes(`${topicSlug}/${noteSlug}`))
        .map(([path, data]) => {
            const {metadata, default: content} = data as { metadata: { title: string },default: ComponentType; };
            const topicTitle = getTopicTitle(list, topicSlug)
            return {
                title: metadata.title,
                topic: topicTitle,
                content
            };
        })[0]
}