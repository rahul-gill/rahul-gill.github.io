<script lang="ts">
    import type {PageData, PageServerData} from './$types';
    import {WebsiteData} from "$lib/data/websiteData";
    import SEOPage from "$lib/SEOPage.svelte";
    import {formatDate} from "$lib/utils/formate-date";
    import Tag from "$lib/components/Tag.svelte";
    import {slugify} from "$lib/utils/slugify";

    export let data: PageServerData;
    $: articles = data.articles;

    const title = `${WebsiteData.userName} | Writing`;
    const description = 'My writing about tech and other things';
    const canonical = `${WebsiteData.websiteAddress}/blog/`;
</script>

<SEOPage {title} {description} {canonical}>
    <div class="prose dark:prose-invert mt-10 mx-auto">

        <h1 class="text-5xl font-cursive">Writings</h1>

        {#each articles as {title, description, slug, datetime, tags}}
            <div class="italic text-sm flex flex-col mt-8">
                <time {datetime} class="primary-coloring">
                    {formatDate(datetime)}
                </time>
            </div>
            <a href="/blog/{slug}/" class="no-underline">
                <h2 class="text-2xl hover:underline my-1">
                    {title}
                </h2>
            </a>
            <p class="my-0">{description}</p>

            <div class="flex mt-2 gap-2 flex-wrap">
                {#each tags as tag}
                    <Tag  href="/tags/{slugify(tag)}/">
                        {tag}
                    </Tag>
                {/each}
            </div>
        {/each}
    </div>
</SEOPage>
