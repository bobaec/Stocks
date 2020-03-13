const rp = require('request-promise');


const coinAPI = 'https://api.coingecko.com/api/v3';
const coinListURL = coinAPI + '/coins/list';
const coinURL = coinAPI + '/simple/price';

const loadCoinList = {
  method: 'GET',
  uri: coinListURL,
  json: true
};

const loadCoin = {
    method: 'GET',
    uri: coinURL,
    json: true,
    qs: {
        'ids': '',
        'vs_currencies': 'cad',
        'include_market_cap': true,
        'include_24hr_vol': true,
        'include_24hr_change': true,
        'include_last_updated_at': true,
    }
};

// /coins/{id}/market_chart
const historicalCoinData = {
    method: 'GET',
    uri: coinAPI,
    json: true,
    qs: {
        'vs_currency': 'cad',
        'days': 1
    }
};


let crypto = {

    getCoins: async () => {
        let coins = {};

        try {
            const coinList = await rp(loadCoinList);
            coinList.forEach(coin => {
                if (!(coin.id.includes('-token') || (coin.id.slice(-5) === 'token'))) {
                    coins[coin.id] = coin.name;
                }
            });
        } catch (err) {
            console.log('API Call Error:', err.message);
        }

        return new Promise((resolve, reject) => {
            if (coins) {
                resolve(coins);
            } else {
                reject('Error');
            }
        });
    },

    getCoin: async (id) => {
        let coin;
        try {
            const coinList = await rp(loadCoinList);
            for (let i = 0; i < coinList.length; i++) {
                coin = coinList[i];
                if (coin.id === id) {
                    loadCoin.qs.ids = id;
                    return await rp(loadCoin);
                }
            }
        } catch (err) {
            console.log('API Call Error:', err.message);
        }
    },

    getMultipleCoins: async (ids) => {
        let coinsReturn = [];

        try {
            const coinList = await rp(loadCoinList);
            ids.sort();
            for (let i = 0; i < coinList.length; i++) {
                if (ids.length === 0) {
                    break;
                }

                let coin = coinList[i];
                if (coin.id === ids[0]) {
                    ids.shift();
                    coinsReturn.push(await crypto.getCoin(coin.id));
                }
            }
        } catch (err) {
            console.log('API Call Error:', err.message);
        }

        return coinsReturn;
    },

    getCoinName: async (id) => {
        let coinName;

        try {
            let coinList = await crypto.getCoins();
            coinName = coinList[id];
        } catch (err) {
            console.log('API Call Error:', err.message);
        }
        return coinName;
    },

    getHistoricalData: async (id, days = 1) => {
        try {
            historicalCoinData.qs.days = days;
            historicalCoinData.uri = coinAPI + '/coins/' + id + '/market_chart';

            let historicalData = await rp(historicalCoinData);
            let filteredData = historicalData['prices'].filter((elem, ind) =>
                ind % 12 === 0 // data in 5 min increments
            );

            return filteredData;
        } catch (err) {
            console.log('API Call Error:', err.message);
        }
    }
};

module.exports = crypto;