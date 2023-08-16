<script lang="ts">
    import type { PageData } from './$types';
    import SEOPage from "$lib/SEOPage.svelte";
    export let data: PageData;

</script>


<SEOPage title="" description="" canonical="">


    <div class="prose mt-4 mx-auto break-words dark:prose-invert">
        <h1 class="text-3xl sm:text-4xl tracking-tight">
            {data.topic}/<br/>
            {data.title}
        </h1>
        <svelte:component this={data.content}/>
    </div>
</SEOPage>