<script context="module">
    // https://darksky.net/dev/account

    import moment from 'moment';

    let duration = 1000 * 60 * 15; // 15 minutes

    let promise;

    const weatherIcons = {

    };

    const precipitationIcons = {

    };
    

    async function fetchWeatherData() {
        const res = await fetch('data/weather');
        const data = await res.json();
        if (res.ok) {
            const rainInfo = data.hourly.data.find(h => h.precipType == "rain" && h.precipProbability > 0.4);
            if (rainInfo) {
                rainInfo.timeDisplay = moment.unix(rainInfo.time).format('h a');
            }

            const weather = {
                temperature: {
                    number: `${Math.round(data.currently.temperature)}°`,
                    icon: weatherIcons[data.currently.icon],
                    description: data.hourly.summary,
                    highAndLow: `${Math.round(data.daily.data[0].apparentTemperatureHigh)}°/${Math.round(data.daily.data[0].apparentTemperatureLow)}°`
                },
                precipitation: {
                    probability: `${Math.round(data.daily.data[0].precipProbability * 100)}%`,
                    icon: precipitationIcons[data.daily.data[0].precipType],
                    rainInfo: rainInfo
                }
            };
            console.log('weather', weather);
            return weather;
        }
        else { throw new Error(res.text); }
    }


    function update() {
        if (process.browser) {
            promise = fetchWeatherData();
        }
    }

    update();
    setInterval(update, duration);

</script>


<div class="weather-container">
    {#await promise}
    <div>Loading...</div>
    {:then weather}
        <!-- {@debug weather} -->
        <!-- {JSON.stringify(weather)} -->
        {#if weather}
        <div class='temperature-main'>
            <i class='temperature-icon wi'></i>
            <div class='temperature-number'>{weather.temperature.number}</div>
        </div>
        <div class='temperature-extras'>
            <div class='temperature-high-and-low'>{weather.temperature.highAndLow}</div>

            {#if weather.precipitation.rainInfo}
            <div class='temperature-percipitation-time-container'>
            <i class='temperature-percipitation-time-icon wi wi-umbrella'></i>
            <div class='temperature-percipitation-time'>{weather.precipitation.rainInfo.timeDisplay}</div>
            </div>
            <div class='temperature-percipitation-container'>
            <i class='temperature-percipitation-icon wi'></i>
            <div class='temperature-percipitation'>{weather.precipitation.rainInfo.probability}</div>
            </div>
            {/if}
        </div>
        <div class='temperature-description'>{weather.temperature.description}</div>
        <!-- <div class='temperature-sub-container'></div> -->
        {/if}
    {:catch error}
        <p>...error</p>
    {/await}
</div>


<style>
.weather-container {
  padding-top: 3vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.temperature-main {
  display: flex;
  justify-content: center;
}

.temperature-number {
  margin-left: 3vw;
  font-size: 20vh;
}

.temperature-icon {
  font-size: 20vh;
}

.temperature-description {
  padding-top: 2vh;
  font-weight: 300;
}

.temperature-extras {
  display: flex;
  font-size: 3vh;
  padding-top: 3vh;
}

.temperature-high-and-low {
  padding-right: 6vw;
}

.temperature-percipitation-time-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 6vw;
}

.temperature-percipitation-time-icon {
  margin-right: 1vh;
}

.temperature-percipitation-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.temperature-percipitation-icon {
  align-self: flex-end;
  margin-right: 1vh;
}

/* .temperature-sub-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5vh;
}

.temperature-sub {
  padding-top: 3vh;
  padding-left: 1vw;
  padding-right: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.temperature-sub-day {
  font-size: 3vh;
}

.temperature-sub-icon {
  padding-top: 2vh;
} */
</style>