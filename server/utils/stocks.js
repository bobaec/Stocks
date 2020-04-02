const axios = require('axios');
const path = {
    yahoo: {
        host: 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        url: `https://${host}/market/`,
        key: process.evv.VANTAGE_API,
    },
    vantage: {
        host: 'alpha-vantage.p.rapidapi.com',
        url: `https://${host}/query/`,
        key: process.evv.VANTAGE_API,
    }
}

stocks = {
    getURL: (query, endpoint, url) => {
        return  {
            "method":"GET",
            "url": path[url] + `${endpoint}`,
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host": path[url].host,
                "x-rapidapi-key": path[url].key,
            },
            "params":{
                "region":"US",
                "lang":"en",
                ...query // object of query
            }
        }
    },
    query: async (query, endpoint) => await (await axios.get(news.getURL(query, `get-${endpoint}`, 'yahoo'))), // || vantage)))
}

module.exports = stocks;