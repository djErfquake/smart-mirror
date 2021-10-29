<script context="module">
	import moment from 'moment';
    // import fetch from 'node-fetch';

    // import Weather from '../components/Weather.svelte';


    let time = {
        clock: "",
        date: "",
        update: function() {
            const m = new moment();
            this.clock = m.format('h:mm A');
            this.date = m.format('dddd MMMM Do YYYY');
            time = this;
        }
    };
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
    let calendar = {
        update: function() { }
    }

    // create and start updates
    let updates = [
        { function: () => { time.update(); }, duration: 1000 * 5 }, // every five seconds
        { function: () => { weather.update(); }, duration: 1000 * 60 * 15 }, // every fiften minutes
        { function: () => { calendar.update(); }, duration: 1000 * 60 * 60  } // every hour
    ];
    
    updates.forEach(u => {
        if (u.interval) { clearInterval(u.interval); u.interval = null; }
        u.function();
        u.interval = setInterval(u.function, u.duration);
    });

</script>



<svelte:head>
	<title>Smart Mirror</title>
</svelte:head>

<main>
	<div class="time-container">
        <div class="clock">{time.clock}</div>
        <div class="date">{time.date}</div>
    </div>
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

    .time-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .clock {
        font-size: 25vh;
    }

    .date {
        font-size: 5vh;
    }
</style>