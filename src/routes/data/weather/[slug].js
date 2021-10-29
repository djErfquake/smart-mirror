import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export async function get(req, res) {
    const { slug } = req.params;
    const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${slug}`
    console.log(`fetching ${url}`);
	fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log('got data!', JSON.stringify(data));
        });
}