<script lang="ts">
    import { slugify } from '$lib/utils/slugify';
    import type { PageData } from './$types';
    import SEOPage from "$lib/SEOPage.svelte";
    import {formatDate} from "$lib/utils/formate-date";
    import {WebsiteData} from "$lib/data/websiteData";
    import Tag from "$lib/components/Tag.svelte";
    import {base} from "$app/paths";

    export let data: PageData;
    $: title = data.title;
    $: description = data.description;
    $: datetime = data.datetime;
    $: last_updated_datetime = data.last_updated_datetime;
    $: tags = data.tags;
    $: Content = data.content;

    $: sluggifiedTitle = slugify(title);

    $: canonical = `${WebsiteData.websiteAddress}/${sluggifiedTitle}/`;

    $: formattedTags = tags.map((tag) => ({
        title: tag,
        slug: slugify(tag)
    }));

    $: formattedDate = formatDate(datetime);
    $: formattedLastUpdatedDatetime =
        last_updated_datetime === undefined ? undefined : formatDate(last_updated_datetime);
</script>

<SEOPage {title} {description} {canonical}>
    <div class="flex items-center justify-center flex-wrap mb-2">
        {#each formattedTags as { title, slug }}
            <Tag href="{base}/blog/tags/{slug}/">
                {title}
            </Tag>
        {/each}
    </div>

    <div class="mb-4 text-center italic text-sm flex flex-col">
        <time {datetime} class="primary-coloring">
            {formattedDate}
        </time>

        {#if last_updated_datetime !== undefined}
            <p class="opacity-50 base-coloring">
                Last modified on <time datetime={last_updated_datetime}>
                {formattedLastUpdatedDatetime}
            </time>
            </p>
        {/if}
    </div>


    <div class="prose mt-4 mx-auto break-words dark:prose-invert">
        <h1 class="text-3xl sm:text-4xl tracking-tight text-center">
            {title}
        </h1>
        <p class="mt-8 text-xl base-coloring">{description}</p>
        <svelte:component this={Content}/>
    </div>
</SEOPage>