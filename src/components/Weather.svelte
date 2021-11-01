<script context="module">
    // https://darksky.net/dev/account
    // https://erikflowers.github.io/weather-icons/

    import moment from 'moment';
    import config from '../config/config';
    import WeatherIcons from './icons/WeatherIcons.svelte';
    import { 
        DaySunny, 
        NightClear, 
        Rain, 
        Snow, 
        Sleet, 
        Windy, 
        Fog, 
        Cloudy,
        DayCloudy,
        NightAltCloudy, 
        Hail, 
        Thunderstorm, 
        Tornado, 
        Raindrop, 
        SnowflakeCold,
        Umbrella } 
    from './icons/WeatherIcons';

    let duration = 1000 * 60 * 15; // 15 minutes
    let promise;

    const weatherIcons = {
        'clear-day': DaySunny,
        'clear-night': NightClear,
        'rain': Rain,
        'snow': Snow,
        'sleet': Sleet,
        'wind': Windy,
        'fog': Fog,
        'cloudy': Cloudy,
        'partly-cloudy-day': DayCloudy,
        'partly-cloudy-night': NightAltCloudy,
        'hail': Hail,
        'thunderstorm': Thunderstorm,
        'tornado': Tornado
    };
    function GetWeatherIcon(description) {
        return weatherIcons[description] ? weatherIcons[description] : 'Thermometer';
    }

    const precipitationIcons = {
        'rain': Raindrop,
        'snow': SnowflakeCold,
        'sleet': Sleet
    };
    function GetPrecipitationIcon(description) {
        return precipitationIcons[description] ? precipitationIcons[description] : 'Raindrop';
    }
    

    async function fetchWeatherData() {
        const res = await fetch(`data/weather/${config.weather.location}`);
        const data = await res.json();
        if (res.ok) {
            const precipitationInfo = data.hourly.data.find(h => h.precipType == "rain" && h.precipProbability > 0.4);
            if (precipitationInfo) {
                precipitationInfo.timeDisplay = moment.unix(precipitationInfo.time).format('h a');
            }

            const weather = {
                temperature: {
                    number: `${Math.round(data.currently.temperature)}°`,
                    icon: GetWeatherIcon(data.currently.icon),
                    description: data.hourly.summary,
                    highAndLow: `${Math.round(data.daily.data[0].apparentTemperatureHigh)}°/${Math.round(data.daily.data[0].apparentTemperatureLow)}°`
                },
                precipitation: {
                    probability: `${Math.round(data.daily.data[0].precipProbability * 100)}%`,
                    icon: GetPrecipitationIcon(data.daily.data[0].precipType),
                    info: precipitationInfo
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
            <WeatherIcons color="#ffffff" size="35vh" d={weather.temperature.icon}></WeatherIcons>
            <div class='temperature-number'>{weather.temperature.number}</div>
        </div>
        <div class='temperature-extras'>
            <div class='temperature-high-and-low'>{weather.temperature.highAndLow}</div>

            {#if weather.precipitation.info}
            <div class='temperature-percipitation-time-container'>
            <div class="temperature-percipitation-time-icon">
                <WeatherIcons color="#ffffff" size="8vh" d={Umbrella}></WeatherIcons>
            </div>
            <div class='temperature-percipitation-time'>{weather.precipitation.info.timeDisplay}</div>
            </div>
            <div class='temperature-percipitation-container'>
            <div class='temperature-percipitation-icon'>
                <WeatherIcons color="#ffffff" size="8vh" d={weather.precipitation.icon}></WeatherIcons>
            </div>
            <div class='temperature-percipitation'>{weather.precipitation.probability}</div>
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
  padding-top: 3vh;
}

.temperature-description {
  padding-top: 2vh;
  font-weight: 300;
  font-size: 5vh;
}

.temperature-extras {
  display: flex;
  font-size: 4vh;
  padding-top: 3vh;
}

.temperature-high-and-low {
    padding-top: 1vh;
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

.temperature-percipitation-time {
  padding-bottom: 2vh;
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

.temperature-percipitation {
  padding-bottom: 2vh;
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