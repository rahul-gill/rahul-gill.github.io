<script lang="ts">
    export let href: string;

    export let className: string = "";
</script>

<a {href} class="base-coloring border
    text-xs px-3 py-1 rounded-2xl flex-shrink-0 mx-1
    ${className} no-underline hover:primary-coloring">
    <slot />
</a>
