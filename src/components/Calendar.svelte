<script>
    import moment from 'moment';
    import Fa from 'svelte-fa';
    import {
        faBirthdayCake,
        faPlane,
        // faRebel,
        faLaughBeam,
        faVideo,
        faImages,
        faGuitar,
        faSuitcaseRolling,
        faHeart,
        faDrumstickBite,
        faGhost,
        faDice,
        faDiceD20,
        faFootballBall,
        faHockeyPuck,
        faFutbol,
        faTree,
        faUtensils,
        faBeer,
        faGift,
        faBook,
        faFilm,
        faClock,
        faPaw,
        faTooth,
        faEye,
        faStethoscope,
        faVoteYea,
        faCalendar
    } from '@fortawesome/free-solid-svg-icons';
    import config from '../config/config';

    const DURATION = 1000 * 60 * 60; // every hour
    const EVENTS_TO_SHOW = 5;

    let updatePromise;
    let allEvents = [];
    $: calendarEvents = allEvents.sort((a, b) => a.timeUntil - b.timeUntil).slice(0, EVENTS_TO_SHOW);;

    const calendarIds = config.calendar.ids.concat(config.calendar.sportsIds);
    const icons = {
        'birthday': faBirthdayCake,
        'bday': faBirthdayCake,
        'flight': faPlane,
        // 'star wars': faRebel,
        'friend': faLaughBeam,
        'zoom': faVideo,
        'scrapbook': faImages,
        'concert': faGuitar,
        'vacation': faSuitcaseRolling,
        'anniversary': faHeart,
        'valentine': faHeart,
        'thanksgiving': faDrumstickBite,
        'friendsgiving': faDrumstickBite,
        'halloween': faGhost,
        'trick or treat': faGhost,
        'game': faDice,
        'd&d': faDiceD20,
        'dnd': faDiceD20,
        'football': faFootballBall,
        'buckeye': faFootballBall,
        'browns': faFootballBall,
        'hockey': faHockeyPuck,
        'blue jackets': faHockeyPuck,
        'bluejackets': faHockeyPuck,
        'soccer': faFutbol,
        'crew': faFutbol,
        'arsenal': faFutbol,
        'fulham': faFutbol,
        'christmas': faTree,
        'xmas': faTree,
        'holiday': faTree,
        'dinner': faUtensils,
        'lunch': faUtensils,
        'brunch': faUtensils,
        'drinks': faBeer,
        'brewery': faBeer,
        'shower': faGift,
        'bible': faBook,
        'movie': faFilm,
        'daylight saving': faClock,
        'darcy': faPaw,
        'dentist': faTooth,
        'eye': faEye,
        'doctor': faStethoscope,
        'dr': faStethoscope,
        'obgyn': faStethoscope,
        'appointment': faStethoscope,
        'appt': faStethoscope,
        'election': faVoteYea
        // default to faCalendar
    };
    function getIcon(title) {
        const applicableIcons = Object.entries(icons).filter(i => title.toLowerCase().includes(i[0]));
        if (applicableIcons.length > 0) {
            return applicableIcons[0][1];
        }
        return faCalendar;
    }

    function stripEmojis(text) {
        return text.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
    }

    async function getGoogleCalendarClientId() {
        const res = await fetch('data/calendar/getClientId');
        const data = await res.json();
        return data.key;
    }

    async function initializeGoogleClient(googleCalendarClientId) {
        await new Promise(resolve => {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                    clientId: googleCalendarClientId,
                    scope: "https://www.googleapis.com/auth/calendar.readonly"
                }).then(() => {
                    resolve();
                });
            });
        });
    }

    async function signInToGoogle() {
        console.log('signing in to google');
        await gapi.auth2.getAuthInstance().signIn();
    }

    async function fetchGoogleCalendarData() {
        // // get all calendars
        // const calenderRequest = gapi.client.calendar.calendarList.list({ maxResults: 250, minAccessRole: 'reader', showHidden: true });
        // calenderRequest.execute((data) => { console.log(data); });


        console.log('updating calendar');  
        let calendarPromises = [];
        const now = new Date();
        calendarIds.forEach(id => {
            const calenderRequest = gapi.client.calendar.events.list({
                'calendarId' : id,
                'timeZone': 'America/New_York',
                'timeMin': now.toISOString(),
                'singleEvents': true,
                'orderBy': 'startTime'
            });
            calendarPromises.push(new Promise((res, rej) => {
                calenderRequest.execute((data) => {
                    res(data);
                });
            }));
        });

        allEvents = [];
        const result = await Promise.all(calendarPromises);
        console.log("all calendar items", result);
        result.forEach(data => {
            let calendarItems = data.items.slice(0, EVENTS_TO_SHOW).map(i => {

                let startMoment;
                let startText = "";
                const isFullDay = i.start.date != undefined;
                
                if (isFullDay) {
                    startMoment = new moment(i.start.date);
                    startText = startMoment.format("dddd");
                    let todayMoment = new moment();
                    const isToday = todayMoment.isSame(startMoment, 'date');
                    if (isToday) {
                        startText = "Today";
                    }
                }
                else {
                    startMoment = new moment(i.start.dateTime);
                    startText = `${startMoment.format("dddd")} at ${startMoment.format("LT")}`;
                    let todayMoment = new moment();
                    const isToday = todayMoment.isSame(startMoment, 'date');
                    if (isToday) {
                        startText = startMoment.fromNow();
                    }
                }
                startText = startText.includes("ago") ? "Now": startText;

                return {
                    id: i.id,
                    name: stripEmojis(i.summary),
                    icon: getIcon(i.summary),
                    timeUntil: startMoment,
                    start: startText
                }
            });
            allEvents = allEvents.concat(calendarItems);
        });
    }
    
    async function load() {
        const googleCalendarClientId = await getGoogleCalendarClientId();
        await initializeGoogleClient(googleCalendarClientId);
        await signInToGoogle();
        await fetchGoogleCalendarData();
        setInterval(fetchGoogleCalendarData, DURATION);
    }

    
    if (process.browser) {
        load();
    }

    
</script>


<div class="calendar-container">
    {#if calendarEvents.length == 0}
        <div>Loading...</div>
    {:else}
        {#each calendarEvents as event}
        <div class="event">
            <div class="event-icon">
                <Fa icon={event.icon} primaryColor='#ffffff' size='6vh'></Fa>
            </div>
            <div class="event-details">
                <div class="event-name">{event.name}</div>
                <div class="event-timeframe">{event.start}</div>
            </div>
        </div>
        {/each}
    {/if}
</div>


<style>
.calendar-container {
    padding-left: 5vw;
}

.event {
    display: flex;
    align-items: center;
}

/* .event:not(:last-child) {
    padding-bottom: 2vh;
} */


.event-icon {
    width: 8vh;
    height: 8vh;
    padding: 10px;
    text-align: center;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.event-name {
    font-size: 4vh;
}

.event-timeframe {
    font-size: 2.5vh;
}
</style>