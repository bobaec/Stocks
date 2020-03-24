const apiKey = 'fbb08fd56b9f492ea1270344e3d2b931';
const axios = require('axios');

news = {
    getURL: (query) => {
        return  'http://newsapi.org/v2/everything?' +
                `q=${query}&` +
                'sortBy=popularity&' +
                `apiKey=${apiKey}`;
    },
    query: async query => await (await axios.get(news.getURL(query))).data
}

module.exports = news;