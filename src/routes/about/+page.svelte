<script lang="ts">
    import SEOPage from "$lib/SEOPage.svelte";
    import {WebsiteData} from "$lib/data/websiteData";

    const title = `${WebsiteData.userName} | About`;
    const description = `Get to know ${WebsiteData.userName}.`;
    const canonical = `${WebsiteData.websiteAddress}/about/`;
</script>

<SEOPage {title} {description} {canonical}>
    <div class="prose dark:prose-invert mt-10 mx-auto">

        <h1 class="text-5xl font-cursive">About</h1>

        <p>
            I've been involved in Android development(Kotlin and Java) for about a year now. I'm also learning to build backends with Golang, Docker and PostgreSQL.
        </p>

        <p>
            I did an Android internship at Stock Register, built some of my own apps and currently I'm doing Google summer of code for Mifos Initiative. I'm building a ui library for Mifos android apps and improving the ui aspects of those apps.
        </p>

        <p>
            Currently, I'm working as an Associate Consultant at Oracle.
        </p>

        <a href={"/cv.pdf"} target="_blank" rel="external" class="primary-coloring">
            See my English resume →
        </a>
    </div>

</SEOPage>