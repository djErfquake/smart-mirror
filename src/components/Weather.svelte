<script context="module">
    // https://darksky.net/dev/account
    // https://erikflowers.github.io/weather-icons/

    import moment from 'moment';
    import config from '../config/config';
    import LineLoader from './loaders/LineLoader.svelte';
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
          console.log('weather', data);

          const precipitationInfo = data.hourly.data.find(h => h.precipType == "rain" && h.precipProbability > 0.4);
          if (precipitationInfo) {
              precipitationInfo.timeDisplay = moment.unix(precipitationInfo.time).format('h a');
          }

          const weather = {
              temperature: {
                  number: Math.round(data.currently.temperature),
                  icon: GetWeatherIcon(data.currently.icon),
                  description: data.hourly.summary,
                  feelsLike: Math.round(data.currently.apparentTemperature),
                  high: Math.round(data.daily.data[0].apparentTemperatureHigh),
                  low: Math.round(data.daily.data[0].apparentTemperatureLow)
              },
              precipitation: {
                  probability: `${Math.round(data.daily.data[0].precipProbability * 100)}%`,
                  icon: GetPrecipitationIcon(data.daily.data[0].precipType),
                  info: precipitationInfo
              }
          };
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
      <LineLoader></LineLoader>
    {:then weather}
        {#if weather}
        <div class='main'>
            <WeatherIcons color="#ffffff" size="35vh" d={weather.temperature.icon}></WeatherIcons>
            <div class='main-number'>{weather.temperature.number}°</div>
        </div>

        <div class='extras'>
            <div class="feels-like">Feels Like: {weather.temperature.feelsLike}°</div>
            <div class="high-low">High: {weather.temperature.high}°</div>
            <div class="high-low">Low: {weather.temperature.low}°</div>
        </div>

        {#if weather.precipitation.info}
        <div class='precipitation'>
            <div class='precipitation-time-container'>
            <div class="precipitation-time-icon">
                <WeatherIcons color="#ffffff" size="8vh" d={Umbrella}></WeatherIcons>
            </div>
            <div class='precipitation-time'>{weather.precipitation.info.timeDisplay}</div>
            </div>
            <div class='precipitation-container'>
            <div class='precipitation-icon'>
                <WeatherIcons color="#ffffff" size="8vh" d={weather.precipitation.icon}></WeatherIcons>
            </div>
            <div class='precipitation'>{weather.precipitation.probability}</div>
            </div>
        </div>
        {/if}

        <div class='description'>{weather.temperature.description}</div>
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
    height: 100%;
}

.main {
    display: flex;
    justify-content: center;
}

.main-number {
    margin-left: 2vw;
    font-size: 20vh;
}

.description {
    font-weight: 300;
    font-size: 5vh;
    margin-top: 5vh;
}

.extras {
    font-size: 4vh;
    width: 90%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    margin-top: -4vh;
}

.precipitation {
    font-size: 4vh;
    width: 90%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
}

.precipitation-time-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.precipitation-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.precipitation-icon {
    padding-top: 1vh;
}
</style>