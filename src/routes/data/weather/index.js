import dotenv from 'dotenv';
import fetch from 'node-fetch';
import config from '../../../config/config.js';

dotenv.config();

export async function get(req, res) {
    const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${config.weather.location}`
    console.log(`fetching ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return (res.statusCode=403, res.end(response.value));
        }

        const data = await response.json();
        // console.log('got data!', JSON.stringify(data));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
    catch (error) {
        return (res.statusCode=403, res.end('error getting weather data'));
    }
}