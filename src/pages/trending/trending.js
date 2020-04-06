const rp = require('request-promise');

const stockAPI = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market';
const stockOptions = {
    method: 'GET',
    url: stockAPI,
    qs: {region: 'US', lang: 'en'},
    headers: {
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        'x-rapidapi-key': '74d1f65e06msh605c1fc7c51ed29p1a3304jsn24596c193286'
    },
    json: true
};

const getMovers = async () => {
    let stockSyms = [];
    stockOptions.url = stockAPI + '/get-movers';
    stockOptions.qs = { ...stockOptions.qs, ...{count: 10}};

    try {
        let stocks = await rp(stockOptions);
        stocks = stocks.finance.result[0].quotes;

        stocks.forEach(elem => {
            stockSyms.push(elem.symbol);
        });
    } catch (e) {
        console.log('API error: ', e);
    }
    
    return stockSyms;
};

exports.getStockData = async () => {
    let stockData = [];
    const movers = await getMovers();
    stockOptions.url = stockAPI + '/get-quotes';
    stockOptions.qs = { ...stockOptions.qs, ...{symbols: movers.join()}};
    
    try {
        let t = await rp(stockOptions);
        t = t.quoteResponse.result;

        t.forEach(e => {
            stockData.push( {
                name: e.longName,
                symbol: e.symbol,
                price: e.regularMarketPrice,
                'growth 24h': e.regularMarketChangePercent
            });
        });
    } catch (e) {
        console.log('API error: ', e);
    }
    
    return stockData;
};

const coinOptions = {
    method: 'GET',
    url: 'https://api.coingecko.com/api/v3/coins/markets',
    qs: {
        vs_currency: 'cad',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
    },
    json: true
};

const sortCoins = (a, b) => {
    const order = 'price_change_percentage_24h_in_currency';
    if (a[order] < b[order]) {  
        return 1;  
    } else if (a[order] > b[order]) {  
        return -1;  
    }  
    return 0;  
};

exports.getCoins = async () => {
    let coinList = [];
    let coins = await rp(coinOptions);
    coins = coins.sort(sortCoins).slice(0,10);
    coins.forEach(coin => {
        coinList.push({
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price,
            'growth 24h': coin.price_change_percentage_24h
        });
    });

    return coinList;
};