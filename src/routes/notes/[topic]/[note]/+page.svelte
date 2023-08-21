<script lang="ts">
    import type {PageData} from './$types';
    import SEOPage from "$lib/SEOPage.svelte";
    import {base} from "$app/paths";
    import NearbyNotes from "$lib/components/NearbyNotes.svelte";

    export let data: PageData;

    $: note = data.note;
    $: notesAround = data.notesAround;
    const title = data.note.title;
</script>


<SEOPage {title} description="" canonical="">


    <div class="prose mt-4 mx-auto break-words dark:prose-invert">
        <h1 class="text-3xl sm:text-4xl tracking-tight">
            {note.title}
        </h1>

        <h2 class="text-2xl sm:text-3xl tracking-tight">Part of '{note.topic}'</h2>
        <NearbyNotes notesBefore={data.haveNotesBefore}
                     notesAfter={data.haveNotesAfter}
                     topicSlug={data.topicSlug}
                     notesAround={data.notesAround}/>
        <svelte:component this={note.content}/>
        <h2 class="text-2xl sm:text-3xl tracking-tight">Part of '{note.topic}'</h2>
        <NearbyNotes notesBefore={data.haveNotesBefore}
                     notesAfter={data.haveNotesAfter}
                     topicSlug={data.topicSlug}
                     notesAround={data.notesAround}/>
    </div>
</SEOPage>