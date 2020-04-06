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
    // let data = await stocks.query({}, 'get-summary', 'yahoo');
    // data = await data.marketSummaryResponse.result;
    const data = testData;
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
    // let data = await stocks.query({symbols: symbols}, 'get-quotes', 'yahoo');
    // data = await data.quoteResponse.result;
    let data = testStock;
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
            borderColor: "#db3d44",
        }]
    }
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

  const testStock = [
    {
      language: 'en',
      region: 'US',
      quoteType: 'EQUITY',
      triggerable: false,
      quoteSourceName: 'Delayed Quote',
      currency: 'USD',
      sharesOutstanding: 342065984,
      marketCap: 769018363904,
      sourceInterval: 15,
      exchangeDataDelayedBy: 0,
      pageViews: { midTermTrend: 'UP', longTermTrend: 'UP', shortTermTrend: 'DOWN' },
      tradeable: true,
      preMarketPrice: 1112.52,
      regularMarketChange: 15.219971,
      regularMarketChangePercent: 1.3766005,
      regularMarketTime: 1585857602,
      regularMarketPrice: 1120.84,
      regularMarketDayHigh: 1126.8,
      regularMarketDayRange: '1096.5 - 1126.8',
      regularMarketDayLow: 1096.5,
      regularMarketVolume: 1964881,
      regularMarketPreviousClose: 1105.62,
      bid: 1105,
      ask: 1121.08,
      bidSize: 8,
      askSize: 11,
      fullExchangeName: 'NasdaqGS',
      regularMarketOpen: 1098.26,
      averageDailyVolume3Month: 2302942,
      beta: 1.025336,
      fiftyTwoWeekLowChange: 107.303955,
      fiftyTwoWeekLowChangePercent: 0.10587089,
      fiftyTwoWeekRange: '1013.536 - 1532.106',
      fiftyTwoWeekHighChange: -411.266,
      fiftyTwoWeekHighChangePercent: -0.2684318,
      fiftyTwoWeekLow: 1013.536,
      fiftyTwoWeekHigh: 1532.106,
      trailingPE: 22.798447,
      dividendsPerShare: 0,
      marketState: 'PRE',
      epsTrailingTwelveMonths: 49.163,
      priceHint: 2,
      preMarketChange: -8.319946,
      preMarketChangePercent: -0.7422956,
      preMarketTime: 1585903300,
      targetPriceMean: 1546.75,
      firstTradeDateMilliseconds: 1092902400000,
      exchange: 'NMS',
      shortName: 'Alphabet Inc.',
      longName: 'Alphabet Inc.',
      messageBoardId: 'finmb_29096',
      exchangeTimezoneName: 'America/New_York',
      exchangeTimezoneShortName: 'EDT',
      gmtOffSetMilliseconds: -14400000,
      market: 'us_market',
      esgPopulated: false,
      symbol: 'GOOG'
    },
    {
      language: 'en',
      region: 'US',
      quoteType: 'EQUITY',
      triggerable: false,
      quoteSourceName: 'Delayed Quote',
      currency: 'USD',
      sharesOutstanding: 299828000,
      marketCap: 769018232832,
      sourceInterval: 15,
      exchangeDataDelayedBy: 0,
      pageViews: { midTermTrend: 'UP', longTermTrend: 'UP', shortTermTrend: 'UP' },
      tradeable: true,
      preMarketPrice: 1108,
      regularMarketChange: 14.930054,
      regularMarketChangePercent: 1.3546914,
      regularMarketTime: 1585857602,
      regularMarketPrice: 1117.03,
      regularMarketDayHigh: 1122.08,
      regularMarketDayRange: '1093.13 - 1122.08',
      regularMarketDayLow: 1093.13,
      regularMarketVolume: 2465991,
      regularMarketPreviousClose: 1102.1,
      bid: 1100.02,
      ask: 1116.6,
      bidSize: 8,
      askSize: 8,
      fullExchangeName: 'NasdaqGS',
      regularMarketOpen: 1100,
      averageDailyVolume3Month: 2505249,
      beta: 1.025336,
      fiftyTwoWeekLowChange: 108.160034,
      fiftyTwoWeekLowChangePercent: 0.10720909,
      fiftyTwoWeekRange: '1008.87 - 1530.74',
      fiftyTwoWeekHighChange: -413.70996,
      fiftyTwoWeekHighChangePercent: -0.27026796,
      fiftyTwoWeekLow: 1008.87,
      fiftyTwoWeekHigh: 1530.74,
      earningsTimestamp: 1580781600,
      earningsTimestampStart: 1588032000,
      earningsTimestampEnd: 1588377600,
      trailingPE: 22.72095,
      dividendsPerShare: 0,
      marketState: 'PRE',
      epsTrailingTwelveMonths: 49.163,
      priceHint: 2,
      preMarketChange: -9.030029,
      preMarketChangePercent: -0.8083963,
      preMarketTime: 1585902055,
      targetPriceMean: 1539.34,
      firstTradeDateMilliseconds: 1092902400000,
      exchange: 'NMS',
      shortName: 'Alphabet Inc.',
      longName: 'Alphabet Inc.',
      messageBoardId: 'finmb_29096',
      exchangeTimezoneName: 'America/New_York',
      exchangeTimezoneShortName: 'EDT',
      gmtOffSetMilliseconds: -14400000,
      market: 'us_market',
      esgPopulated: false,
      symbol: 'GOOGL'
    }
  ]