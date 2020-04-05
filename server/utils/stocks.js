const API = '95022c1af6mshe219525df3006b4p1007a7jsn6a10ee212f7c';
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
    // let data = await stocks.query({}, 'get-summary');
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
    // let data = await stocks.query({symbols: symbols}, 'get-quotes');
    // data = await data.quoteResponse.result;
    let data = testStock;
    return formatStock(data);
}; 

exports.getData = async params => {
    // const data = (await stocks.query(params, '', 'vantage'))[`Time Series (${params.interval})`];
    const value = timeseries => type => timeseries[type];
    const data = {
        "2020-04-03 16:00:00": {
            "1. open": "480.0100",
            "2. high": "481.2200",
            "3. low": "478.7200",
            "4. close": "480.0400",
            "5. volume": "472318"
        },
        "2020-04-03 15:55:00": {
            "1. open": "479.1900",
            "2. high": "480.8760",
            "3. low": "477.8200",
            "4. close": "479.9500",
            "5. volume": "234730"
        },
        "2020-04-03 15:50:00": {
            "1. open": "476.0100",
            "2. high": "480.7500",
            "3. low": "475.9900",
            "4. close": "479.1404",
            "5. volume": "253008"
        },
        "2020-04-03 15:45:00": {
            "1. open": "477.9400",
            "2. high": "478.4000",
            "3. low": "475.2816",
            "4. close": "475.7900",
            "5. volume": "141116"
        },
        "2020-04-03 15:40:00": {
            "1. open": "477.3900",
            "2. high": "478.9400",
            "3. low": "477.0400",
            "4. close": "477.6400",
            "5. volume": "100007"
        },
        "2020-04-03 15:35:00": {
            "1. open": "477.7572",
            "2. high": "478.9900",
            "3. low": "476.9500",
            "4. close": "477.4433",
            "5. volume": "85091"
        },
        "2020-04-03 15:30:00": {
            "1. open": "477.6874",
            "2. high": "479.0931",
            "3. low": "476.6080",
            "4. close": "477.7273",
            "5. volume": "90111"
        },
        "2020-04-03 15:25:00": {
            "1. open": "478.5085",
            "2. high": "479.7300",
            "3. low": "477.2200",
            "4. close": "477.8900",
            "5. volume": "91347"
        },
        "2020-04-03 15:20:00": {
            "1. open": "477.6000",
            "2. high": "480.0100",
            "3. low": "476.5000",
            "4. close": "478.7050",
            "5. volume": "142366"
        },
        "2020-04-03 15:15:00": {
            "1. open": "475.8500",
            "2. high": "478.4900",
            "3. low": "475.5700",
            "4. close": "477.5100",
            "5. volume": "117076"
        },
        "2020-04-03 15:10:00": {
            "1. open": "478.2550",
            "2. high": "478.4111",
            "3. low": "475.6000",
            "4. close": "475.9200",
            "5. volume": "148826"
        },
        "2020-04-03 15:05:00": {
            "1. open": "480.0460",
            "2. high": "481.0000",
            "3. low": "477.2000",
            "4. close": "477.9800",
            "5. volume": "170385"
        },
        "2020-04-03 15:00:00": {
            "1. open": "477.6900",
            "2. high": "481.2100",
            "3. low": "477.6900",
            "4. close": "480.0000",
            "5. volume": "179484"
        },
        "2020-04-03 14:55:00": {
            "1. open": "476.5900",
            "2. high": "479.5700",
            "3. low": "476.5900",
            "4. close": "477.9050",
            "5. volume": "143642"
        },
        "2020-04-03 14:50:00": {
            "1. open": "476.1600",
            "2. high": "477.4700",
            "3. low": "475.8100",
            "4. close": "476.6000",
            "5. volume": "64395"
        },
        "2020-04-03 14:45:00": {
            "1. open": "477.3693",
            "2. high": "478.0000",
            "3. low": "475.2003",
            "4. close": "476.1600",
            "5. volume": "103263"
        },
        "2020-04-03 14:40:00": {
            "1. open": "477.8084",
            "2. high": "478.2500",
            "3. low": "476.7700",
            "4. close": "477.3500",
            "5. volume": "116277"
        },
        "2020-04-03 14:35:00": {
            "1. open": "479.3100",
            "2. high": "479.3950",
            "3. low": "476.2500",
            "4. close": "477.5700",
            "5. volume": "134760"
        },
        "2020-04-03 14:30:00": {
            "1. open": "477.1800",
            "2. high": "479.6790",
            "3. low": "477.0000",
            "4. close": "479.3382",
            "5. volume": "188715"
        },
        "2020-04-03 14:25:00": {
            "1. open": "474.4300",
            "2. high": "478.4800",
            "3. low": "474.1900",
            "4. close": "477.1700",
            "5. volume": "208394"
        },
        "2020-04-03 14:20:00": {
            "1. open": "473.8592",
            "2. high": "475.4200",
            "3. low": "473.5600",
            "4. close": "474.3947",
            "5. volume": "115417"
        },
        "2020-04-03 14:15:00": {
            "1. open": "473.7504",
            "2. high": "474.1300",
            "3. low": "472.5100",
            "4. close": "473.7800",
            "5. volume": "47905"
        },
        "2020-04-03 14:10:00": {
            "1. open": "474.8557",
            "2. high": "474.9960",
            "3. low": "471.0200",
            "4. close": "473.7281",
            "5. volume": "121421"
        },
        "2020-04-03 14:05:00": {
            "1. open": "474.4610",
            "2. high": "476.4100",
            "3. low": "473.5800",
            "4. close": "474.8657",
            "5. volume": "137147"
        },
        "2020-04-03 14:00:00": {
            "1. open": "474.5700",
            "2. high": "474.8800",
            "3. low": "472.7200",
            "4. close": "474.7300",
            "5. volume": "86683"
        },
        "2020-04-03 13:55:00": {
            "1. open": "475.3650",
            "2. high": "475.4680",
            "3. low": "472.6600",
            "4. close": "474.3500",
            "5. volume": "144582"
        },
        "2020-04-03 13:50:00": {
            "1. open": "472.1801",
            "2. high": "476.7999",
            "3. low": "472.1468",
            "4. close": "475.3060",
            "5. volume": "321473"
        },
        "2020-04-03 13:45:00": {
            "1. open": "469.1100",
            "2. high": "472.8500",
            "3. low": "468.8000",
            "4. close": "472.2000",
            "5. volume": "167925"
        },
        "2020-04-03 13:40:00": {
            "1. open": "468.9915",
            "2. high": "470.9400",
            "3. low": "468.7500",
            "4. close": "469.1195",
            "5. volume": "120544"
        },
        "2020-04-03 13:35:00": {
            "1. open": "471.3100",
            "2. high": "471.3100",
            "3. low": "468.3901",
            "4. close": "469.1000",
            "5. volume": "201830"
        },
        "2020-04-03 13:30:00": {
            "1. open": "471.6449",
            "2. high": "472.5000",
            "3. low": "470.0000",
            "4. close": "471.3299",
            "5. volume": "147101"
        },
        "2020-04-03 13:25:00": {
            "1. open": "472.5200",
            "2. high": "473.4897",
            "3. low": "470.2000",
            "4. close": "471.9900",
            "5. volume": "140097"
        },
        "2020-04-03 13:20:00": {
            "1. open": "470.1900",
            "2. high": "474.3600",
            "3. low": "470.0000",
            "4. close": "472.4369",
            "5. volume": "214562"
        },
        "2020-04-03 13:15:00": {
            "1. open": "474.5000",
            "2. high": "475.3000",
            "3. low": "470.0000",
            "4. close": "470.1700",
            "5. volume": "188062"
        },
        "2020-04-03 13:10:00": {
            "1. open": "474.1631",
            "2. high": "475.7700",
            "3. low": "473.3100",
            "4. close": "474.6000",
            "5. volume": "168477"
        },
        "2020-04-03 13:05:00": {
            "1. open": "475.0501",
            "2. high": "475.1400",
            "3. low": "472.0300",
            "4. close": "473.9300",
            "5. volume": "176389"
        },
        "2020-04-03 13:00:00": {
            "1. open": "477.4300",
            "2. high": "478.0100",
            "3. low": "473.0000",
            "4. close": "474.8400",
            "5. volume": "261239"
        },
        "2020-04-03 12:55:00": {
            "1. open": "478.6300",
            "2. high": "479.8800",
            "3. low": "477.0000",
            "4. close": "477.6500",
            "5. volume": "115423"
        },
        "2020-04-03 12:50:00": {
            "1. open": "480.2600",
            "2. high": "481.0000",
            "3. low": "478.2000",
            "4. close": "478.3400",
            "5. volume": "154037"
        },
        "2020-04-03 12:45:00": {
            "1. open": "478.7500",
            "2. high": "481.4900",
            "3. low": "477.4604",
            "4. close": "480.4000",
            "5. volume": "195978"
        },
        "2020-04-03 12:40:00": {
            "1. open": "477.9900",
            "2. high": "479.5000",
            "3. low": "477.3800",
            "4. close": "478.6000",
            "5. volume": "123996"
        },
        "2020-04-03 12:35:00": {
            "1. open": "479.7100",
            "2. high": "481.0600",
            "3. low": "477.9900",
            "4. close": "477.9900",
            "5. volume": "172689"
        },
        "2020-04-03 12:30:00": {
            "1. open": "480.4302",
            "2. high": "480.7699",
            "3. low": "478.1001",
            "4. close": "479.8350",
            "5. volume": "193312"
        },
        "2020-04-03 12:25:00": {
            "1. open": "481.8607",
            "2. high": "483.0350",
            "3. low": "480.0000",
            "4. close": "480.2300",
            "5. volume": "160599"
        },
        "2020-04-03 12:20:00": {
            "1. open": "481.3350",
            "2. high": "483.2000",
            "3. low": "480.2700",
            "4. close": "481.8619",
            "5. volume": "197874"
        },
        "2020-04-03 12:15:00": {
            "1. open": "485.8146",
            "2. high": "486.3800",
            "3. low": "479.0500",
            "4. close": "481.2616",
            "5. volume": "317927"
        },
        "2020-04-03 12:10:00": {
            "1. open": "487.5350",
            "2. high": "487.6700",
            "3. low": "484.4800",
            "4. close": "485.9519",
            "5. volume": "134469"
        },
        "2020-04-03 12:05:00": {
            "1. open": "486.1765",
            "2. high": "488.4650",
            "3. low": "486.0000",
            "4. close": "487.5550",
            "5. volume": "108698"
        },
        "2020-04-03 12:00:00": {
            "1. open": "486.7100",
            "2. high": "487.8300",
            "3. low": "485.3200",
            "4. close": "486.1600",
            "5. volume": "86757"
        },
        "2020-04-03 11:55:00": {
            "1. open": "487.4700",
            "2. high": "488.0000",
            "3. low": "484.2300",
            "4. close": "486.5023",
            "5. volume": "165355"
        },
        "2020-04-03 11:50:00": {
            "1. open": "487.6500",
            "2. high": "487.8000",
            "3. low": "485.3000",
            "4. close": "487.0000",
            "5. volume": "149336"
        },
        "2020-04-03 11:45:00": {
            "1. open": "490.6700",
            "2. high": "490.6700",
            "3. low": "486.5019",
            "4. close": "487.5750",
            "5. volume": "137229"
        },
        "2020-04-03 11:40:00": {
            "1. open": "489.5085",
            "2. high": "491.8700",
            "3. low": "488.2600",
            "4. close": "490.7700",
            "5. volume": "169199"
        },
        "2020-04-03 11:35:00": {
            "1. open": "488.9575",
            "2. high": "490.7600",
            "3. low": "487.5000",
            "4. close": "489.7200",
            "5. volume": "212545"
        },
        "2020-04-03 11:30:00": {
            "1. open": "486.0500",
            "2. high": "489.8999",
            "3. low": "485.6066",
            "4. close": "488.7916",
            "5. volume": "184237"
        },
        "2020-04-03 11:25:00": {
            "1. open": "486.7500",
            "2. high": "488.5000",
            "3. low": "485.1200",
            "4. close": "486.0050",
            "5. volume": "134235"
        },
        "2020-04-03 11:20:00": {
            "1. open": "485.4800",
            "2. high": "487.3100",
            "3. low": "484.5500",
            "4. close": "486.6200",
            "5. volume": "146041"
        },
        "2020-04-03 11:15:00": {
            "1. open": "487.4300",
            "2. high": "488.9800",
            "3. low": "484.5540",
            "4. close": "485.0301",
            "5. volume": "165151"
        },
        "2020-04-03 11:10:00": {
            "1. open": "488.0150",
            "2. high": "488.2450",
            "3. low": "485.5600",
            "4. close": "487.8100",
            "5. volume": "139683"
        },
        "2020-04-03 11:05:00": {
            "1. open": "487.4500",
            "2. high": "490.0000",
            "3. low": "487.1000",
            "4. close": "488.0100",
            "5. volume": "132000"
        },
        "2020-04-03 11:00:00": {
            "1. open": "488.5800",
            "2. high": "491.4100",
            "3. low": "485.1600",
            "4. close": "487.3000",
            "5. volume": "181994"
        },
        "2020-04-03 10:55:00": {
            "1. open": "492.7200",
            "2. high": "493.0000",
            "3. low": "487.6300",
            "4. close": "488.5000",
            "5. volume": "241193"
        },
        "2020-04-03 10:50:00": {
            "1. open": "491.0100",
            "2. high": "493.7500",
            "3. low": "489.3000",
            "4. close": "492.8900",
            "5. volume": "306942"
        },
        "2020-04-03 10:45:00": {
            "1. open": "486.5500",
            "2. high": "491.9380",
            "3. low": "485.2000",
            "4. close": "491.4300",
            "5. volume": "306789"
        },
        "2020-04-03 10:40:00": {
            "1. open": "489.3900",
            "2. high": "490.6700",
            "3. low": "485.5100",
            "4. close": "486.2200",
            "5. volume": "280308"
        },
        "2020-04-03 10:35:00": {
            "1. open": "486.4200",
            "2. high": "488.7000",
            "3. low": "482.5300",
            "4. close": "488.1582",
            "5. volume": "400688"
        },
        "2020-04-03 10:30:00": {
            "1. open": "490.8400",
            "2. high": "491.1600",
            "3. low": "486.1000",
            "4. close": "486.2500",
            "5. volume": "236288"
        },
        "2020-04-03 10:25:00": {
            "1. open": "485.7500",
            "2. high": "491.4096",
            "3. low": "484.2200",
            "4. close": "491.0763",
            "5. volume": "373949"
        },
        "2020-04-03 10:20:00": {
            "1. open": "491.5900",
            "2. high": "491.5900",
            "3. low": "485.4216",
            "4. close": "485.7400",
            "5. volume": "504481"
        },
        "2020-04-03 10:15:00": {
            "1. open": "494.5500",
            "2. high": "494.8700",
            "3. low": "490.6100",
            "4. close": "491.7362",
            "5. volume": "278429"
        },
        "2020-04-03 10:10:00": {
            "1. open": "493.8650",
            "2. high": "498.5300",
            "3. low": "493.0000",
            "4. close": "494.6000",
            "5. volume": "302988"
        },
        "2020-04-03 10:05:00": {
            "1. open": "495.1101",
            "2. high": "498.7000",
            "3. low": "490.3800",
            "4. close": "493.7450",
            "5. volume": "404852"
        },
        "2020-04-03 10:00:00": {
            "1. open": "499.9100",
            "2. high": "505.4900",
            "3. low": "493.5000",
            "4. close": "495.2200",
            "5. volume": "598679"
        },
        "2020-04-03 09:55:00": {
            "1. open": "500.6769",
            "2. high": "503.0000",
            "3. low": "498.0100",
            "4. close": "499.7949",
            "5. volume": "349491"
        },
        "2020-04-03 09:50:00": {
            "1. open": "491.6400",
            "2. high": "504.7300",
            "3. low": "491.0000",
            "4. close": "499.3980",
            "5. volume": "663761"
        },
        "2020-04-03 09:45:00": {
            "1. open": "503.6600",
            "2. high": "505.4300",
            "3. low": "491.7500",
            "4. close": "492.0700",
            "5. volume": "700175"
        },
        "2020-04-03 09:40:00": {
            "1. open": "508.2856",
            "2. high": "512.4900",
            "3. low": "501.3300",
            "4. close": "503.3300",
            "5. volume": "644583"
        },
        "2020-04-03 09:35:00": {
            "1. open": "502.4000",
            "2. high": "515.4900",
            "3. low": "496.5500",
            "4. close": "507.0452",
            "5. volume": "2421634"
        },
        "2020-04-02 16:00:00": {
            "1. open": "454.4400",
            "2. high": "454.7900",
            "3. low": "452.2500",
            "4. close": "454.5100",
            "5. volume": "377061"
        },
        "2020-04-02 15:55:00": {
            "1. open": "451.7700",
            "2. high": "455.4000",
            "3. low": "451.0000",
            "4. close": "454.4050",
            "5. volume": "306509"
        },
        "2020-04-02 15:50:00": {
            "1. open": "452.2250",
            "2. high": "453.6700",
            "3. low": "450.2000",
            "4. close": "451.5200",
            "5. volume": "179690"
        },
        "2020-04-02 15:45:00": {
            "1. open": "449.1432",
            "2. high": "452.5000",
            "3. low": "448.0700",
            "4. close": "452.1600",
            "5. volume": "248132"
        },
        "2020-04-02 15:40:00": {
            "1. open": "448.9799",
            "2. high": "449.8000",
            "3. low": "446.4000",
            "4. close": "449.0000",
            "5. volume": "162316"
        },
        "2020-04-02 15:35:00": {
            "1. open": "450.8300",
            "2. high": "451.8000",
            "3. low": "447.7035",
            "4. close": "448.5900",
            "5. volume": "165455"
        },
        "2020-04-02 15:30:00": {
            "1. open": "452.6300",
            "2. high": "453.6300",
            "3. low": "448.7666",
            "4. close": "450.4400",
            "5. volume": "308561"
        },
        "2020-04-02 15:25:00": {
            "1. open": "455.5100",
            "2. high": "455.9900",
            "3. low": "452.4323",
            "4. close": "452.5600",
            "5. volume": "145803"
        },
        "2020-04-02 15:20:00": {
            "1. open": "453.0000",
            "2. high": "455.9100",
            "3. low": "452.5350",
            "4. close": "455.7050",
            "5. volume": "97297"
        },
        "2020-04-02 15:15:00": {
            "1. open": "455.3145",
            "2. high": "455.4500",
            "3. low": "452.1100",
            "4. close": "452.9300",
            "5. volume": "91358"
        },
        "2020-04-02 15:10:00": {
            "1. open": "456.5000",
            "2. high": "456.5000",
            "3. low": "452.5900",
            "4. close": "455.5500",
            "5. volume": "134487"
        },
        "2020-04-02 15:05:00": {
            "1. open": "456.7184",
            "2. high": "458.8000",
            "3. low": "455.6200",
            "4. close": "456.2948",
            "5. volume": "149749"
        },
        "2020-04-02 15:00:00": {
            "1. open": "454.4600",
            "2. high": "456.9000",
            "3. low": "453.6079",
            "4. close": "456.6100",
            "5. volume": "145833"
        },
        "2020-04-02 14:55:00": {
            "1. open": "452.0100",
            "2. high": "455.6300",
            "3. low": "451.3600",
            "4. close": "454.5050",
            "5. volume": "158265"
        },
        "2020-04-02 14:50:00": {
            "1. open": "451.1400",
            "2. high": "453.6900",
            "3. low": "451.0600",
            "4. close": "452.2450",
            "5. volume": "93947"
        },
        "2020-04-02 14:45:00": {
            "1. open": "453.5700",
            "2. high": "454.3700",
            "3. low": "450.6312",
            "4. close": "451.4028",
            "5. volume": "152979"
        },
        "2020-04-02 14:40:00": {
            "1. open": "452.4700",
            "2. high": "454.8900",
            "3. low": "451.5000",
            "4. close": "453.5000",
            "5. volume": "117974"
        },
        "2020-04-02 14:35:00": {
            "1. open": "453.1200",
            "2. high": "454.9900",
            "3. low": "451.1001",
            "4. close": "452.5373",
            "5. volume": "132203"
        },
        "2020-04-02 14:30:00": {
            "1. open": "450.6950",
            "2. high": "454.9000",
            "3. low": "450.5138",
            "4. close": "453.3200",
            "5. volume": "194782"
        },
        "2020-04-02 14:25:00": {
            "1. open": "450.3950",
            "2. high": "451.9400",
            "3. low": "450.2500",
            "4. close": "450.6600",
            "5. volume": "168941"
        },
        "2020-04-02 14:20:00": {
            "1. open": "454.8800",
            "2. high": "455.5106",
            "3. low": "450.3100",
            "4. close": "450.3950",
            "5. volume": "230264"
        },
        "2020-04-02 14:15:00": {
            "1. open": "454.7500",
            "2. high": "455.6500",
            "3. low": "453.0000",
            "4. close": "455.0239",
            "5. volume": "168635"
        }
    };
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