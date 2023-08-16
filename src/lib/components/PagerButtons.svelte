<script lang="ts">
    export let currentPageIndex: number = 0;
    export let lastPageIndex: number;
    export let goToPage: (pageNumber: number) => void;

    export let className = "";

    $: pagesToShow = calculatePagesToShow(currentPageIndex, lastPageIndex);
    function calculatePagesToShow(current: number, last: number) {
        const result = [current];

        for (let i = 1; i <= 2; i++) {
            if (current - i >= 0) {
                result.unshift(current - i);
            }
            if (current + i <= last) {
                result.push(current + i);
            }
        }
        console.log("result: ", result)
        return result;
    }
</script>

<div class="flex items-center justify-center space-x-2 {className}">

    <button
            class="px-4 py-1 hover:primary-coloring rounded-md border-2 {currentPageIndex < 0 ? 'invisible' : '' }"
            on:click={() => goToPage(0)}>
        First
    </button>
    <button
            class="px-4 py-1 hover:primary-coloring rounded-md border-2 {currentPageIndex < 0 ? 'invisible' : '' }"
            on:click={() => goToPage(currentPageIndex - 1)}>
        Previous
    </button>

    <span class="{currentPageIndex < 2 ? 'invisible' : ''}">...</span>


    {#each pagesToShow as page}
        {#if page === currentPageIndex}
            <span class="px-4 py-1 primary-coloring rounded-md border-2">{page + 1}</span>
        {:else if Math.abs(page - currentPageIndex) <= 1}
            <button class="px-4 py-1 hover:primary-coloring rounded-md border-2" on:click={() => goToPage(page)}>{page + 1}</button>
        {/if}
    {/each}

    <span  class="{lastPageIndex - currentPageIndex < 2 ? 'invisible' : ''}">...</span>


    <button
            class="px-4 py-1 hover:primary-coloring rounded-md border-2  {currentPageIndex > lastPageIndex ? 'invisible' : '' }"
            on:click={() => goToPage(currentPageIndex + 1)}>
        Next
    </button>
    <button
            class="px-4 py-1 hover:primary-coloring rounded-md border-2"
            on:click={() => goToPage(lastPageIndex)}>
        Last
    </button>
</div>