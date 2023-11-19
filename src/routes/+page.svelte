<script>
    import img from "$lib/einstein.jpg"

    let innerWidth = 0
    let innerHeight = 0

    $: condition = innerWidth*1.33 <= innerHeight
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="w-full font-bold p-4">
    <div class="py-4 md:text-6xl text-2xl md:text-left text-center">Do you like reading textbooks?</div>
    <div class="py-4 md:text-4xl text-xl text-center underline">Probably not!</div>

    <div class="sm:mx-[20%] flex sm:w-[60%] w-full mt-[7%] items-center bg-slate-500 py-[3%] rounded-3xl">
        <div class="md:text-2xl text-lg sm:flex-[3] flex-[2] text-center">
            <div class="">Have the world's greatest minds read too you!</div>
            <div class="p-4 font-normal md:text-lg text-sm">Great minds with great books create the best learning enviornment</div>
        </div>

        {#if innerWidth > 1500}

        <div class="flex-1">
            <div class=""><img src={ img } alt="" class=""></div>
        </div>

        {/if}
    </div>
</div>