<script lang="ts">
    import {navBarIconLinks, navBarTextLinks} from "$lib/data/routes";
    import NavLink from "$lib/components/NavLink.svelte";
    import {page} from "$app/stores";
    import DarkModeToggle from "$lib/components/DarkModeToggle.svelte";
    import {draw, fade} from 'svelte/transition';
    import {base} from "$app/paths";

    let showNavBar = false;

    function toggleNavMenu() {
        showNavBar = !showNavBar;
    }
</script>
<nav class="flex items-baseline md:justify-center justify-between">
    <a href="{base}/" class="text-lg py-4 pr-4">
        Rahul Gill
    </a>
    <div class="space-x-4 hidden md:flex items-center">
        {#each navBarTextLinks as {href, external, text} }
            <NavLink {href} {external} active={$page.url.pathname === href}>
                {text}
            </NavLink>
        {/each}
        {#each navBarIconLinks as {href, external, icon}}
            <NavLink {href} {external} active={$page.url.pathname === href}>
                <svelte:component this={icon}/>
            </NavLink>
        {/each}
        <DarkModeToggle/>
    </div>


    <div class="z-30 flex items-center justify-end md:hidden">

        <DarkModeToggle/>
        <button on:click={toggleNavMenu}>
            <span class="sr-only">
                {showNavBar ? 'Close drawer' : 'Open drawer'}
            </span>
            <svg
                    class="hover:primary-coloring w-6 h-6 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
            >
                {#if !showNavBar}
                    <path
                            transition:draw={{ duration: 300 }}
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"/>
                {:else}
                    <path
                            transition:draw={{ duration: 300 }}
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"/>
                {/if}
            </svg>

        </button>
    </div>

    {#if showNavBar}
        <div
                class="fixed inset-0 px-10 pt-20 base-coloring md:hidden z-20 flex flex-col items-center"
                transition:fade={{ duration: 200 }}
        >
            {#each navBarTextLinks as {href, external, text} }
                <NavLink {href} {external} active={$page.url.pathname === href} className="py-0 text-xl" on:click={() => showNavBar = false}>
                    {text}
                </NavLink>
            {/each}
            {#each navBarIconLinks as {href, external, text}}
                <NavLink {href} {external} active={$page.url.pathname === href} className="py-0 text-xl" on:click={() => showNavBar = false}>
                    {text}
                </NavLink>
            {/each}
        </div>
    {/if}
</nav>
<hr class="h-0.5 bg-slate-500 dark:bg-slate-500 opacity-50"/>