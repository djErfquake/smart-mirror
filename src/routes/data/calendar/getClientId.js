import dotenv from 'dotenv';

dotenv.config();

export async function get(req, res) {
    const data = { key: process.env.GOOGLE_CALENDAR_CLIENT_ID };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}