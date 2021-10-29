<script context="module">

    // https://darksky.net/dev/account

    let promise;
    if (process.browser) {
        promise = fetchWeatherData();
        async function fetchWeatherData() {
            const res = await fetch('data/weather');
            const data = await res.json();
            if (res.ok) { return data; }
            else { throw new Error(res.text); }
        }
    }

</script>


<div class="weather-container">
    {#await promise}
    <div>Loading...</div>
    {:then data}
        {@debug data}
        {JSON.stringify(data)}
    {:catch error}
        <p>...error</p>
    {/await}
</div>


<style>

</style>