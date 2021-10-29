<script>
    import moment from 'moment';

    let duration = 1000 * 5; // 5 seconds
    let clock = "";
    let date = "";

    function update() {
        const m = new moment();
        clock = m.format('h:mm A');
        date = m.format('dddd MMMM Do YYYY');
    }

    update();
    setInterval(update, duration);

</script>


<div class="time-container">
    <div class="clock">{clock}</div>
    <div class="date">{date}</div>
</div>


<style>
    .time-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 5vh;
    }

    .clock {
        font-size: 18vh;
    }

    .date {
        font-size: 5vh;
    }
</style>