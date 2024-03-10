export default {
    API_URL: process.env.NODE_ENV === 'production' ? process.env.API : 'http://localhost:4001/',
}