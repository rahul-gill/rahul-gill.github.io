<script lang="ts">
    import { onMount } from 'svelte';

    let isDark = false;

    const toggleTheme = () => {
        isDark = !isDark;
        document.body.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    const setThemeFromPreference = () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        if ((savedTheme === null && prefersDark) || savedTheme === 'dark') {
            toggleTheme();
        }
    };

    onMount(() => {
        // Check for saved theme preference in localStorage
        setThemeFromPreference();

        // Listen for changes to user's preferred color scheme
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeFromPreference);

    });

    export let className = "";
</script>


<button class="cursor-pointer transition-transform transform hover:primary-coloring {className} py-6"
        on:click={toggleTheme}>

    {#if isDark}
        <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
    {:else}
        <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
    {/if}
</button>