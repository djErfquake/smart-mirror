<script>
    import Time from '../components/Time.svelte';
    import Weather from '../components/Weather.svelte';
    import Calendar from '../components/Calendar.svelte';

    const DURATION = 1000 * 60; // 1 minute
    const Slides = [
        { name : "all", grid: `"time time" "calendar weather"`, widths: { weather: "60vw", calendar: "40vw" } },
        { name : "weather", grid: `"time time" "weather weather"`, widths: { weather: "100%", calendar: "0" } },
        { name : "calendar", grid: `"time time" "calendar calendar"`, widths: { weather: "0", calendar: "100%" } }
    ];
    let slideIndex = 0;
    $: showWeather = Slides[slideIndex].grid.includes('weather');
    $: showCalendar = Slides[slideIndex].grid.includes('calendar');

    // setInterval(() => {
    //     slideIndex++; if (slideIndex >= Slides.length) { slideIndex = 0; }
    // }, DURATION);

</script>



<svelte:head>
	<title>Smart Mirror</title>
</svelte:head>

<main style="grid-template-areas: {Slides[slideIndex].grid};">
    <div class="time">
        <Time></Time>
    </div>
    <div class="calendar" style="display: {showCalendar ? 'block' : 'none'}; width: {Slides[slideIndex].widths.calendar};">
        <Calendar></Calendar>
    </div>
    <div class="weather" style="display: {showWeather ? 'block' : 'none'}; width: {Slides[slideIndex].widths.weather};">
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
        /* grid-template: 
            "time time"
            "calendar weather" */
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