<script>
    let innerWidth = 0
    let innerHeight = 0
    let email = "Email"
    let showClipboard = true

    let showDropdown = "hidden"

    $: condition = innerWidth*1.33 <= innerHeight

    const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    const changeDropDown = () => {
        if (showDropdown == "visible") {
            showDropdown = "hidden"
        }
        else {
            showDropdown = "visible"
        }
    }

    async function copyEmail() {
        navigator.clipboard.writeText("DenaliSchlesinger06+web@gmail.com");
        email = "Copied"
        showClipboard = false
        await sleepNow(1000)
        showClipboard = true
        email = "Email"
    }

</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main class="py-2 bg-slate-800">
    <div class="w-full text-white font-bold flex items-center">
        <!-- {#if innerWidth > 768} -->
        <a href="/" class="py-5 flex-[1] text-center w-full text-lg hover:cursor-pointer hover:text-green-500 hover:border-b-green-500 border-b border-transparent" id="home">
            Home
        </a>
        <a href="/tool" class="py-5 flex-[1] text-center w-full text-lg hover:cursor-pointer hover:text-green-500 hover:border-b-green-500 border-b border-transparent" id="home">
            Tool
        </a>
        <a href="/about" class="py-5 flex-[1] text-center w-full text-lg hover:cursor-pointer hover:text-green-500 hover:border-b-green-500 border-b border-transparent" id="home">
            Sources To Try!
        </a>
        <!-- {:else if innerWidth <= 768}
        <div class="py-5 flex-[15] text-center w-full text-lg md:hidden" id="home">
            Denali Schlesinger
        </div>
        {/if} -->
    </div>
</main>

<style>

</style>