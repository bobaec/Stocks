const apiKey = process.env.NEWS_API;
const axios = require('axios');

news = {
    getURL: (query) => {
        return  'http://newsapi.org/v2/everything?' +
                `q=${query}&` +
                'sortBy=publishedAt&' +
                'language=en&' + 
                `apiKey=${apiKey}`;
    },
    query: async query => await (await axios.get(news.getURL(query))).data
}

module.exports = news;