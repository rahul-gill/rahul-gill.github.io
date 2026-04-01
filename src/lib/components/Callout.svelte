<script lang="ts">
  export type CalloutVariant = 'info' | 'warn' | 'tip';

  export let variant: CalloutVariant = 'info';
  export let label: string | undefined = undefined;

  const variantClasses: Record<CalloutVariant, { border: string; bg: string }> = {
    // info  — fuchsia, matches your primary-coloring accent
    info: {
      border: 'border-fuchsia-900 dark:border-fuchsia-600',
      bg:     'bg-fuchsia-50   dark:bg-fuchsia-950',
    },
    // warn  — amber
    warn: {
      border: 'border-amber-700 dark:border-amber-500',
      bg:     'bg-amber-50     dark:bg-amber-950',
    },
    // tip   — emerald
    tip: {
      border: 'border-emerald-700 dark:border-emerald-500',
      bg:     'bg-emerald-50      dark:bg-emerald-950',
    },
  };

  const labelClasses: Record<CalloutVariant, string> = {
    info: 'text-fuchsia-900 dark:text-fuchsia-400',
    warn: 'text-amber-800   dark:text-amber-400',
    tip:  'text-emerald-800 dark:text-emerald-400',
  };

  $: v = variantClasses[variant];
  $: lc = labelClasses[variant];
</script>

<aside class="
  border-l-[3px]
  rounded-r-md
  px-5 py-4
  my-6
  transition-colors duration-300 ease-in-out
  {v.border}
  {v.bg}
">
  {#if label}
    <p class="
      text-[11px] font-medium tracking-widest uppercase mb-1 leading-none
      {lc}
    ">
      {label}
    </p>
  {/if}

  <div class="callout-body text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200 transition-colors duration-300 ease-in-out">
    <slot />
  </div>
</aside>

<style>
  /* Strip default paragraph margins injected by mdsvex / prose styles
     so content sits flush against the label and doesn't double-space */
  .callout-body :global(p:first-child) { margin-top: 0; }
  .callout-body :global(p:last-child)  { margin-bottom: 0; }

  /* Keep inline code readable inside tinted backgrounds */
  .callout-body :global(code) {
    background: rgb(0 0 0 / 0.08);
    border-radius: 3px;
    padding: 1px 5px;
    font-size: 13px;
  }
</style>