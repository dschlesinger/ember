<script>
    import Header from "$lib/shared/Header.svelte";
    import "../app.css"

    console.log("Welcome to Ember!")
</script>

<div class=" absolute min-h-full w-full bg-slate-400">

    <Header />

    <slot />
</div>