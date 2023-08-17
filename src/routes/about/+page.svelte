<script lang="ts">
    import SEOPage from "$lib/SEOPage.svelte";
    import {WebsiteData} from "$lib/data/websiteData";
    import {formatDate} from "$lib/utils/formate-date";
    import {slugify} from "$lib/utils/slugify";
    import Tag from "$lib/components/Tag.svelte";
    import type {PageServerData} from './$types';
    import {base} from "$app/paths";

    const title = `${WebsiteData.userName} | About`;
    const description = `Get to know ${WebsiteData.userName}.`;
    const canonical = `${WebsiteData.websiteAddress}/about/`;

    export let data: PageServerData;
</script>

<SEOPage {title} {description} {canonical}>
    <div class="prose dark:prose-invert mt-10 mx-auto">

        <h1 class="text-5xl">About</h1>

        <p>
            I've been involved in Android development(Kotlin and Java) for about a year now. I'm also learning to build backends with Golang, Docker and PostgreSQL.
        </p>

        <p>
            I did an Android internship at Stock Register, built some of my own apps and currently I'm doing Google summer of code for Mifos Initiative. I'm building a ui library for Mifos android apps and improving the ui aspects of those apps.
        </p>

        <p>
            Currently, I'm working as an Associate Consultant at Oracle.
        </p>

        <a href={base + "/cv.pdf"} target="_blank" rel="external" class="primary-coloring">
            See my English resume →
        </a>

        {#if data.articles.length > 0}
            <h1 class="mt-8">Latest writings</h1>

            {#each data.articles as {title, description, slug, datetime, tags}}
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
                        <Tag href="{base}/blog/tags/{slugify(tag)}/">
                            {tag}
                        </Tag>
                    {/each}
                </div>
            {/each}
        {/if}
    </div>

</SEOPage>