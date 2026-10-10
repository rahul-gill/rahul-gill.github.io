<script lang="ts">
    import "../app.postcss";
    import NavBar from "#lib/components/NavBar.svelte";

    async function copyAnchor(e: MouseEvent) {
    const a = (e.target as Element).closest?.('a.heading-anchor') as HTMLAnchorElement | null;
    if (!a) return;

    e.preventDefault();

    try {
      await navigator.clipboard.writeText(a.href);
      a.classList.add('copied');
      setTimeout(() => a.classList.remove('copied'), 1500);
    } catch {
      // clipboard unavailable (e.g. insecure context); fall back to normal navigation
      location.hash = a.getAttribute('href') ?? '';
    }
  }
</script>

<svelte:window onclick={copyAnchor} />

<div class="base-coloring w-full">
    <div class="flex flex-col min-h-screen px-6 lg:px-16 max-w-7xl mx-auto ">
        <NavBar/>

        <main class="flex flex-col flex-grow h-full">
            <slot/>
        </main>

    </div>
</div>