<script lang="ts">
    import type {PageServerData} from './$types';
    import {WebsiteData} from "$lib/data/websiteData";
    import SEOPage from "$lib/SEOPage.svelte";
    import {formatDate} from "$lib/utils/formate-date";
    import Tag from "$lib/components/Tag.svelte";
    import {slugify} from "$lib/utils/slugify";
    import PagerButtons from "$lib/components/PagerButtons.svelte";
    import { page } from '$app/stores';
    import {goto} from "$app/navigation";
    import {base} from "$app/paths";
    export let data: PageServerData;

    const title = `${WebsiteData.userName} | Writing`;
    const description = 'My writing about tech and other things';
    const canonical = `${WebsiteData.websiteAddress}/blog/`;

    $: currentPageNumber = parseInt($page.params.pageno);
    const itemCountPerPage = 10;
    $: lastPageNumber = Math.floor(data.articles.length / itemCountPerPage);
    $: pagedItems = data.articles.slice(currentPageNumber * itemCountPerPage, currentPageNumber * itemCountPerPage + itemCountPerPage)
</script>

<SEOPage {title} {description} {canonical}>
    <div class="prose dark:prose-invert mt-10 mb-20 mx-auto">

        <h1 class="text-5xl font-cursive">Writings</h1>

        {#each pagedItems as {title, description, slug, datetime, tags}}
            <div class="italic text-sm flex flex-col mt-8">
                <time {datetime} class="primary-coloring">
                    {formatDate(datetime)}
                </time>
            </div>
            <a href="{base}/blog/{slug}/" class="no-underline">
                <h2 class="text-2xl hover:underline my-1">
                    {title}
                </h2>
            </a>
            <p class="my-0">{description}</p>

            <div class="flex mt-2 gap-2 flex-wrap">
                {#each tags as tag}
                    <Tag  href="{base}/blog/tags/{slugify(tag)}/">
                        {tag}
                    </Tag>
                {/each}
            </div>
        {/each}
    </div>
    {#if lastPageNumber > 0}
        <PagerButtons
                currentPageIndex={currentPageNumber}
                lastPageIndex={lastPageNumber}
                goToPage={(page) => goto(`/blog/page/${page}`)}
                className="my-8"/>
    {/if}
</SEOPage>
