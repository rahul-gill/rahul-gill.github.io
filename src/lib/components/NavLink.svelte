<script lang="ts">
    export let href: string;
    export let external = false;
    export let active = false;
    export let className = "";
</script>

<a
        {href}
        rel={external === true ? 'external' : undefined}
        target={external === true ? '_blank' : undefined}
        on:click
        class="{active === true ? 'active-link' : ''} {className} hover:primary-coloring"
>
    <slot/>
</a>
