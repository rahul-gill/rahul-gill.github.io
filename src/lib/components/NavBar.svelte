<script lang="ts">
    import {navBarIconLinks, navBarTextLinks} from "$lib/data/routes";
    import NavLink from "$lib/components/NavLink.svelte";
    import {page} from "$app/stores";
    import DarkModeToggle from "$lib/components/DarkModeToggle.svelte";
    import {draw, fade} from 'svelte/transition';
    import {base} from "$app/paths";
    import HamburgereMenuSwitcher from "./HamburgereMenuSwitcher.svelte";

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
        <HamburgereMenuSwitcher onClick={toggleNavMenu} open={showNavBar}/>
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