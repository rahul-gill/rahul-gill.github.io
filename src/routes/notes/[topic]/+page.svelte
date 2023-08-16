<script lang="ts">
    import SEOPage from "$lib/SEOPage.svelte";
    import {WebsiteData} from "$lib/data/websiteData";
    import type {PageServerData} from './$types';
    import {page} from "$app/stores";
    import {getTopicNameFromSlug} from "$lib/data/notes";
    import slugify from "slugify";

    const title = `${WebsiteData.userName} | Notes`;
    const description = `A collection of notes for self-studying computer science.`;
    const canonical = `${WebsiteData.websiteAddress}/notes/`;

    export let data: PageServerData;
    $: topic = $page.params.topic;
    $: notesInTopic = data.notes;
</script>

<SEOPage {title} {description} {canonical}>
    <div class="prose dark:prose-invert mt-10 mx-auto">

        <h1 class="text-4xl">{getTopicNameFromSlug(topic)} Notes</h1>

        <ul>
            {#each notesInTopic as {title, slug}, index}
                <li class="text-lg list-none">
                    <a href="/notes/{slug}" class="primary-coloring no-underline hover:underline">
                        {index + 1}. {title} →
                    </a>
                </li>
            {/each}
        </ul>


    </div>
</SEOPage>