<!-- <script context="module"> -->
<script>
    // import fetch from 'node-fetch';

     import Time from '../components/Time.svelte';
    // import Weather from '../components/Weather.svelte';


    let weather = {
        // promise: null,
        // fetchWeatherData: async function() {
        //     const res = await fetch('data/weather');
        //     const data = await res.json();
        //     if (res.ok) { return data; }
        //     else { throw new Error(res.text); }
        // },
        update: function() {
            // this.promise = this.fetchWeatherData();
        }
    };

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
    <!-- <Weather></Weather> -->
</main>


<style>
	:global(html) {
        height: 100%;
    }

    :global(body) {
        text-rendering: optimizeLegibility;
        background-color: black;
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