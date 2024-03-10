export default {
    API_URL: process.env.NODE_ENV === 'production' ? 'https://shorttener-production.up.railway.app/api/' : 'http://localhost:4001/api/',
}