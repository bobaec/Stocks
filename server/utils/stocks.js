const YAHOO_API = '95022c1af6mshe219525df3006b4p1007a7jsn6a10ee212f7c';
const axios = require('axios');
const path = {
    yahoo: {
        host: 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        get url() { return 'https://' + this.host + '/market/'; },
        key: YAHOO_API,
    },
    vantage: {
        host: 'alpha-vantage.p.rapidapi.com',
        get url() { return 'https://' + this.host + '/query/'; },
        key: '',
    }
};

const stocks = {
    getURL: (query, endpoint, url) => {
        return  {
            "method":"GET",
            "url": path[url]['url'] + endpoint,
            "headers":{
                "x-rapidapi-host": path[url]['host'],
                "x-rapidapi-key": path[url]['key'],
            },
            "params":{
                "region":"US",
                "lang":"en",
                ...query // object of query
            },
            "data": {}
        }
    },
    query: async (query, endpoint) => {
        const send = stocks.getURL(query, `get-${endpoint}`, 'yahoo'); // || vantage)))
        try{
        const data = await axios.get(send.url, {params: send.params, headers: send.headers});
        return await data.data.marketSummaryResponse.result;
        } catch(e) {
            console.log('error:', e);
        }
    }
};

module.exports = stocks;