<script>
    import Time from '../components/Time.svelte';
    import Weather from '../components/Weather.svelte';
    import Calendar from '../components/Calendar.svelte';

</script>



<svelte:head>
	<title>Smart Mirror</title>
</svelte:head>

<main>
	<!-- <Time></Time>
    <hr>
    <Weather></Weather>
    <hr> -->
    <Calendar></Calendar>
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