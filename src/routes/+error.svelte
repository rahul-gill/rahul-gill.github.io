<script>
    import { page } from '$app/stores';
    import {base} from "$app/paths"
</script>


<div class="prose dark:prose-invert mt-10 mx-auto text-center">
    <h1>Oops! {$page.error.message}</h1>
    <a href="{base}/" class="no-underline"><h2 class="hover:primary-coloring">Go to Home page</h2></a>
</div>