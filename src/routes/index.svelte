<script>
    import Time from '../components/Time.svelte';
    import Weather from '../components/Weather.svelte';


    // // create and start updates
    // let updates = [
    //     { function: () => { time.update(); }, duration: 1000 * 5 }, // every five seconds
    //     { function: () => { weather.update(); }, duration: 1000 * 60 * 15 }, // every fiften minutes
    //     { function: () => { calendar.update(); }, duration: 1000 * 60 * 60  } // every hour
    // ];

</script>



<svelte:head>
	<title>Smart Mirror</title>
</svelte:head>

<main>
	<Time></Time>
    <hr>
    <Weather></Weather>
    <!-- <hr> -->
</main>


<style>
	:global(html) {
        height: 100%;
    }

    :global(body) {
        text-rendering: optimizeLegibility;
    }

    :global(#sapper) {
        height: 100%;
    }

    :global(#sapper-container) {
        height: 100%;
    }

    main {
        height: 100%;
        
    }

    
</style>