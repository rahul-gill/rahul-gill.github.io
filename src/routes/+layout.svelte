<script>
  import "../app.postcss";
  import NavBar from "$lib/components/NavBar.svelte";

</script>

<div class="base-coloring w-full">
    <div class="flex flex-col min-h-screen px-6 lg:px-16 max-w-7xl mx-auto ">
        <NavBar/>

        <main class="flex flex-col flex-grow h-full">
            <slot />
        </main>

    </div>
</div>