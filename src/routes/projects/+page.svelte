<script>
    import SEOPage from "$lib/SEOPage.svelte";
    import {WebsiteData} from "$lib/data/websiteData";
    import {formatLinkType, UserProjectsInfo} from "$lib/data/projects";
    import NavLink from "$lib/components/NavLink.svelte";


    const title = `${WebsiteData.userName} | Projects`;
    const description = 'My code projects';
    const canonical = `${WebsiteData.userName}/projects/`;

</script>
<SEOPage {title} {description} {canonical}>
    <div class="mt-10 mx-auto max-w-5xl">
        <h1 class="prose dark:prose-invert text-5xl font-cursive">Projects</h1>
        <section class="grid grid-cols-1 gap-16 md:gap-24 lg:gap-32 mt-10">
            {#each UserProjectsInfo as {title, description, imageSrc, links}}
                <article class="grid grid-cols-1 xl:grid-cols-6 gap-16">
                    <div class="col-span-1 xl:col-span-2 space-y-8">
                        <header>
                            <h2 class="text-2xl primary-coloring hover:primary-coloring">{title}</h2>
                        </header>
                        <div class="prose dark:prose-invert">
                            {#each description as p}
                                <p>{p}</p>
                            {/each}
                        </div>
                        <footer>
                            <ul class="space-y-2">
                                {#each links as {href, type}}
                                    <li>
                                        <a {href} target="_blank" rel="external" class="primary-coloring">
                                            {formatLinkType(type)} →
                                        </a>
                                    </li>
                                {/each}
                            </ul>
                        </footer>
                    </div>
                    <div class="col-span-1 xl:col-span-4 flex justify-center items-center xl:mt-4">
                        <div class="w-full overflow-hidden relative">
                            <div class="relative w-full bg-gray-100" style="padding-bottom: 56%" />

                            <img
                                    src={imageSrc}
                                    alt=""
                                    loading="lazy"
                                    class="object-center object-cover absolute inset-0 w-full"
                            />
                        </div>
                    </div>
                </article>
                <hr class="h-0.5 bg-slate-500 dark:bg-slate-500 opacity-50"/>
            {/each}
        </section>
    </div>
</SEOPage>