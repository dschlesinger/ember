<script lang="ts">

    import axios from 'axios';

    import audio from "$lib/audio"
    import getText from "$lib/getText"
    import { onMount } from "svelte";
    import { Loader2 } from "lucide-svelte";

    import { HfInference } from '@huggingface/inference'

    import { PUBLIC_HUGGING_FACE_API_KEY,PUBLIC_BB_KEY,PUBLIC_DA_KEY,PUBLIC_WW_KEY } from '$env/static/public';

    const hf = new HfInference(PUBLIC_HUGGING_FACE_API_KEY)

    let url:string = ""

    let audioBlob:Blob;

    let article:string = ""

    let audiofile;

    let articleText:string = "";

    let show:boolean = false;

    let audioclips:any[] = []

    let generating:boolean = false;

    let summary:string = "";

    let people:any = {"Walter White":PUBLIC_WW_KEY,"David Attenborough":PUBLIC_DA_KEY, "Bilbo Baggins":PUBLIC_BB_KEY}

    let chunks:string[] = []


    const getAudio = async (paragraph:string,person:string = PUBLIC_WW_KEY) => {
        let data = await audio(paragraph, person) 
        audioBlob = new Blob([data], { type: 'audio/mpeg' });
        url = URL.createObjectURL(audioBlob);
        let audiomessage = new Audio(url)
        return audiomessage
    }

    async function processInput(input:string, person:string) {

        generating = true

        audioclips = []

        summary = ""

        chunks = input.split("\n")
        chunks = chunks.filter((chunk) => chunk.split(" ").length > 10)    

        for (let chunk = 0; chunk < chunks.length; chunk++) {
            let chunkaudio = await getAudio(chunks[chunk],person)
            audioclips.push(chunkaudio)
        }

        generating = false

        show = true

        query(input).then((response) => {
        try{
	        summary = response[0].summary_text;
        }
        catch{
            summary = "Failed"
        }
    });

    }
    const query = async (data:string) => {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/slauw87/bart_summarisation",
                {
                    headers: { Authorization: `Bearer ${PUBLIC_HUGGING_FACE_API_KEY}` },
                    method: "POST",
                    body: JSON.stringify(data),
                }
	        );
	
            const result = await response.json();
	        return result;
        }       


    import { Check, ChevronsUpDown } from "lucide-svelte";
    import * as Command from "$lib/components/ui/command";
    import * as Popover from "$lib/components/ui/popover";
    import { Button } from "$lib/components/ui/button";
    import { cn } from "$lib/utils";
    import { tick } from "svelte";

    const voices = [
    {
      value: "WW",
      label: "Walter White"
    },
    {
      value: "DA",
      label: "David Attenborough"
    },
    {
        value: "BB",
        label: "Bilbo Baggins"
    }
  ];

  let open = false;
  let value = "";
  $: selectedValue =
    voices.find((f) => f.value === value)?.label ?? "Select a voice...";

    function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

  function clearText() {
    articleText = ""
  }

</script>

<div class="flex-col flex items-center">
{#if !show}
<div class="p-4">
    <div class="p-2 w-full text-center font-bold text-lg">Select a Voice</div>
    <Popover.Root bind:open let:ids>
        <Popover.Trigger asChild let:builder>
        <Button
            builders={[builder]}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            class="w-[200px] justify-between"
        >
            {selectedValue}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        </Popover.Trigger>
        <Popover.Content class="w-[200px] p-0">
        <Command.Root>
            <Command.Input placeholder="Search people..." />
            <Command.Empty>No people found.</Command.Empty>
            <Command.Group>
            {#each voices as voice}
                <Command.Item
                value={voice.value}
                onSelect={(currentValue) => {
                    value = currentValue;
                    closeAndFocusTrigger(ids.trigger);
                }}
                >
                <Check
                    class={cn(
                    "mr-2 h-4 w-4",
                    value !== voice.value && "text-transparent"
                    )}
                />
                {voice.label}
                </Command.Item>
            {/each}
            </Command.Group>
        </Command.Root>
        </Popover.Content>
    </Popover.Root>
</div>
<!-- <Button on:click={() => {console.log(selectedValue);(getAudio(articleText,people.WW)).then(data => data.play())}} class="m-4">Get Audio</Button> -->

<div class="p-2 w-full text-center font-bold text-lg">Enter Text to Process</div>

<textarea contenteditable class="bg-slate-300 w-[80%] mx-[10%] rounded-sm p-2" rows="8" cols="50" bind:value={articleText}></textarea>

<div class="">
<Button class="m-4" on:click={clearText}>Clear Text</Button>
{#if generating}
<Button disabled><Loader2 class="mr-2 h-4 w-4 animate-spin"></Loader2>Generating...</Button>
{:else}
<Button class="m-4" on:click={() => {

    if (articleText != ""){
        processInput(articleText, people[selectedValue])
    }

    }
}>Generate</Button>
{/if}
</div>


{:else}
<Button on:click={() => {show = false}} class="m-4">Try Another Text</Button>

{#each Array(chunks.length) as _,i}
    <div class="flex bg-slate-300 sm:w-[80%] w-[95%] my-10 rounded-sm items-center">
        <div class="flex-[2] p-2">{chunks[i]}</div>
        <div class="flex-1 flex items-center align-middle">
            <Button on:click={() => {audioclips[i].play()}} class="mx-[40%] w-[20%]">Play</Button>
        </div>
    </div>
{/each}

<div class="sm:w-[80%] w-[95%] bg-slate-300 my-10 rounded-sm items-center p-2">
    <div class="text-lg font-bold border-b border-black">Summary:</div>
    { summary }
</div>

{/if}
</div>