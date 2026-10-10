<script lang="ts">
    import { resolve } from '$app/paths';

    export let notesBefore: number;
    export let notesAfter: number;
    export let topicSlug: string;
    export let notesAround: { slug: string, noteNumber: number, isCurrent: boolean, title: string }[];


</script>

<ul class="list-none">
    {#if notesBefore !== 0}
        <li>
            <a href={resolve('/notes/[topic]', { topic: topicSlug })}
               class="no-underline text-lg flex flex-row items-center"
            >
                        <span class="w-9 h-9 primary-coloring-bg rounded-full flex items-center justify-center mr-2">
                            ...
                        </span>
                <span class="hover:primary-coloring">
                            {notesBefore} notes before this. Go to main page
                        </span>
            </a>
        </li>
    {/if}
    {#each notesAround as noteAround}
        <li>
            <a href={resolve('/notes/[topic]', { topic: noteAround.slug })}
               class="no-underline text-lg flex flex-row items-center"
            >
                        <span class="w-9 h-9 primary-coloring-bg rounded-full flex items-center justify-center mr-2">
                            {noteAround.noteNumber}
                        </span>
                <span class="{noteAround.isCurrent ? 'primary-coloring' : 'hover:primary-coloring'} ">
                            {noteAround.title} →
                        </span>
            </a>
        </li>
    {/each}
    {#if notesAfter !== 0}
        <li>
            <a href={resolve('/notes/[topic]', { topic: topicSlug })}
               class="no-underline text-lg flex flex-row items-center"
            >
                        <span class="w-9 h-9 primary-coloring-bg rounded-full flex items-center justify-center mr-2">
                            ...
                        </span>
                <span class="hover:primary-coloring">
                            {notesAfter} notes after this. Go to main page
                         </span>
            </a>
        </li>
    {/if}
</ul>