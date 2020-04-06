const API = '74d1f65e06msh605c1fc7c51ed29p1a3304jsn24596c193286';
const axios = require('axios');
const path = {
    yahoo: {
        host: 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        get url() { return 'https://' + this.host + '/market/'; },
        key: API,
    },
    vantage: {
        host: 'alpha-vantage.p.rapidapi.com',
        get url() { return 'https://' + this.host + '/query/'; },
        key: API,
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
    query: async (query, endpoint, provider) => {
        const payload = stocks.getURL(query, endpoint, provider);
        try{
            const data = await axios.get(payload.url, {params: payload.params, headers: payload.headers});
            return await data.data;
        } catch(e) {
            console.log('error:', e);
        }
    }
};

exports.getMarketData = async () => {
    let data = await stocks.query({}, 'get-summary', 'yahoo');
    data = await data.marketSummaryResponse.result;

    return formatMarket(data);
};

const formatMarket = async (data) => {
    let result = [];

    data.forEach(e => {
        result.push({
            name: e.shortName,
            symbol: e.symbol,
            price: e.regularMarketPrice.raw,
            change: e.regularMarketChangePercent.raw,
            exchange: e.exchange,
            market: e.market,
            quoteType: e.quoteType,
            time: e.regularMarketTime.raw * 1000
        });
    });
    
    return result;
};

exports.stockSearch = async (symbol) => {
    const url = 'https://www.nasdaq.com/search_api_autocomplete/symbols_autocomplete?q=' + symbol;
    let result = await axios.get(url);
    result = await result.data.slice(0,6);

    let searchResult = [];
    result.forEach(e => {
        if (e.assetclass === 'stocks') {
            searchResult.push({
                id: e.value,
                name: stringClean(e.label)
            });
        }
    });
    
    return searchResult;
};

const formatStock = async (data) => {
    let result = [];

    data.forEach(e => {
        result.push({
            name: e.shortName,
            symbol: e.symbol,
            price: e.regularMarketPrice,
            change: e.regularMarketChangePercent,
            exchange: e.fullExchangeName,
            market: e.market,
            quoteType: e.quoteType,
            time: e.regularMarketTime * 1000
        });
    });
    
    return result;
};

const stringClean = str => {
    let s = str.toString();
    s = s.match(/\s{2}[A-Za-z0-9\s]+/g);
    s = s[1].replace('\n', '').trim();
    return s;
};

exports.getStocks = async (symbols) => {
    let data = await stocks.query({symbols: symbols}, 'get-quotes', 'yahoo');
    data = await data.quoteResponse.result;

    return formatStock(data);
}; 

exports.getData = async params => {
    const data = (await stocks.query(params, '', 'vantage'))[`Time Series (${params.interval})`];
    const value = timeseries => type => timeseries[type];

    return {
        labels: Object.keys(data),
        datasets: [{
            label: "open",
            data: Object.entries(data).map(([key, val]) => value(val)('1. open')),
            borderColor: "#db3d44",
        },
        {
            label: "close",
            data: Object.entries(data).map(([key, val]) => value(val)('4. close')),
            borderColor: "#3ddbce",
        }]
    }
};