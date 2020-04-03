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

exports.getMarketData = async () => {
    // const data = await stocks.query({}, 'summary');
    const data = testData;
    return format(data);
};

const format = async (data) => {
    // const data = testData;
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

const testData = [
    {
      fullExchangeName: 'CME',
      exchangeTimezoneName: 'America/New_York',
      symbol: 'ES=F',
      regularMarketChange: { raw: -36.25, fmt: '-36.25' },
      gmtOffSetMilliseconds: -14400000,
      headSymbolAsString: 'ES=F',
      exchangeDataDelayedBy: 10,
      language: 'en',
      regularMarketTime: { raw: 1585889706, fmt: '12:55AM EDT' },
      exchangeTimezoneShortName: 'EDT',
      regularMarketChangePercent: { raw: -1.4404927, fmt: '-1.44%' },
      quoteType: 'FUTURE',
      marketState: 'REGULAR',
      regularMarketPrice: { raw: 2480.25, fmt: '2,480.25' },
      market: 'us24_market',
      tradeable: false,
      exchange: 'CME',
      sourceInterval: 10,
      shortName: 'S&P Futures',
      region: 'US',
      regularMarketPreviousClose: { raw: 2516.5, fmt: '2,516.50' },
      triggerable: false
    },
    {
      fullExchangeName: 'CBOT',
      exchangeTimezoneName: 'America/New_York',
      symbol: 'YM=F',
      regularMarketChange: { raw: -314, fmt: '-314.00' },
      gmtOffSetMilliseconds: -14400000,
      headSymbolAsString: 'YM=F',
      exchangeDataDelayedBy: 10,
      language: 'en',
      regularMarketTime: { raw: 1585889708, fmt: '12:55AM EDT' },
      exchangeTimezoneShortName: 'EDT',
      regularMarketChangePercent: { raw: -1.4760494, fmt: '-1.48%' },
      quoteType: 'FUTURE',
      marketState: 'REGULAR',
      regularMarketPrice: { raw: 20959, fmt: '20,959.00' },
      market: 'us24_market',
      tradeable: false,
      exchange: 'CBT',
      sourceInterval: 10,
      shortName: 'Dow Futures',
      region: 'US',
      regularMarketPreviousClose: { raw: 21273, fmt: '21,273.00' },
      triggerable: false
    },
    {
      fullExchangeName: 'CME',
      exchangeTimezoneName: 'America/New_York',
      symbol: 'NQ=F',
      regularMarketChange: { raw: -99.75, fmt: '-99.75' },
      gmtOffSetMilliseconds: -14400000,
      headSymbolAsString: 'NQ=F',
      exchangeDataDelayedBy: 10,
      language: 'en',
      regularMarketTime: { raw: 1585889706, fmt: '12:55AM EDT' },
      exchangeTimezoneShortName: 'EDT',
      regularMarketChangePercent: { raw: -1.3078108, fmt: '-1.31%' },
      quoteType: 'FUTURE',
      marketState: 'REGULAR',
      regularMarketPrice: { raw: 7527.5, fmt: '7,527.50' },
      market: 'us24_market',
      tradeable: false,
      exchange: 'CME',
      sourceInterval: 10,
      shortName: 'Nasdaq Futures',
      region: 'US',
      regularMarketPreviousClose: { raw: 7627.25, fmt: '7,627.25' },
      triggerable: false
    }
  ];