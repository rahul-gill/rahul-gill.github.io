<script lang="ts">
    import SEOPage from "$lib/SEOPage.svelte";
    import {WebsiteData} from "$lib/data/websiteData";
    import type {PageData, PageServerData} from './$types';
    import {page} from "$app/stores";

    const title = `${WebsiteData.userName} | Notes`;
    const description = `A collection of notes for self-studying computer science.`;
    const canonical = `${WebsiteData.websiteAddress}/notes/`;

    export let data: PageData;
    $: topic = $page.params.topic;
    $: notesInTopic = data.notes;
    $: console.log(notesInTopic)
</script>

<SEOPage {title} {description} {canonical}>
    <div class="prose dark:prose-invert mt-10 mx-auto">

        <h1 class="text-4xl">{data.topicTitle}</h1>

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