<script lang="ts">
    import {formatDate} from "$lib/utils/formate-date";
    import {slugify} from "$lib/utils/slugify";
    import {goto} from "$app/navigation";
    import SEOPage from "$lib/SEOPage.svelte";
    import PagerButtons from "$lib/components/PagerButtons.svelte";
    import Tag from "$lib/components/Tag.svelte";
    import {WebsiteData} from "$lib/data/websiteData";
    import {page} from "$app/stores";
    import type {PageServerData} from './$types';
    export let data: PageServerData;


    $: tag = $page.params.tag;

    const title = `${WebsiteData.userName} | Writing`;
    const description = `My writing tagged '${tag}'`;
    const canonical = `${WebsiteData.websiteAddress}/blog/`;


    $: currentPageNumber = parseInt($page.params.pageno);
    const itemCountPerPage = 10;
    $: lastPageNumber = Math.floor(data.articles.length / itemCountPerPage);
    $: pagedItems = data.articles.slice(currentPageNumber * itemCountPerPage, currentPageNumber * itemCountPerPage + itemCountPerPage)
</script>
<SEOPage {title} {description} {canonical}>
    <div class="prose dark:prose-invert mt-10 mb-20 mx-auto">

        <h1 class="text-5xl font-cursive">Writings tagged '{tag}'</h1>

        {#each pagedItems as {title, description, slug, datetime, tags}}
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
                    <Tag href="/blog/tags/{slugify(tag)}/">
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
                goToPage={(page) => goto(`/blog/tags/${tag}/${page}`)}
                className="my-8"/>
    {/if}
</SEOPage>
