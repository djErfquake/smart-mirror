<script>
    import moment from 'moment';
    import config from '../config/config';

    const DURATION = 1000 * 60 * 60; // every hour
    const EVENTS_TO_SHOW = 5;

    let updatePromise;
    let allEvents = [];
    $: calendarEvents = allEvents.sort((a, b) => a.timeUntil - b.timeUntil).slice(0, EVENTS_TO_SHOW);;

    const calendarIds = config.calendar.ids;

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
                let startMoment = i.start.date ? new moment(i.start.date) : new moment(i.start.dateTime);
                return {
                    id: i.id,
                    name: i.summary,
                    timeUntil: startMoment,
                    start: startMoment.fromNow().includes("ago") ? "Today" : startMoment.fromNow()
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
        // setInterval(fetchGoogleCalendarData, DURATION);
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
            <div class="event-icon"></div>
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
  padding-left: 20vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
}

.event {
  display: flex;
  align-items: center;
}

.event:not(:last-child) {
  padding-bottom: 2vh;
}


.event-icon {
  font-size: 5vh;
  padding-right: 2vw;
}

.event-name {
  font-size: 3vh;
}
</style>