<script>
    import Time from '../components/Time.svelte';
    import Weather from '../components/Weather.svelte';
    import Calendar from '../components/Calendar.svelte';

</script>



<svelte:head>
	<title>Smart Mirror</title>
</svelte:head>

<main>
    <div class="time">
        <Time></Time>
    </div>
    <div class="calendar">
        <Calendar></Calendar>
    </div>
    <div class="weather">
        <Weather></Weather>
    </div>
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
        display: grid;
        grid-template: 
            "time time"
            "calendar weather"
    }

    .time {
        grid-area: time;
    }

    .weather {
        grid-area: weather;
        width: 60vw;
    }

    .calendar {
        grid-area: calendar;
        width: 40vw;
    }

    
</style>