<script>
    import { page } from '$app/state';
    import {resolve} from "$app/paths"
</script>


<div class="prose dark:prose-invert mt-10 mx-auto text-center">
    <h1>Oops! {page.error?.message ?? "Something bad happened."}</h1>
    <a href={resolve('/')} class="no-underline"><h2 class="hover:primary-coloring">Go to Home page</h2></a>
</div>