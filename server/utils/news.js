const apiKey = fbb08fd56b9f492ea1270344e3d2b931;

news = {
    getURL: (query) => {
        return  'http://newsapi.org/v2/everything?' +
                `q=${query}&` +
                'sortBy=popularity&' +
                `apiKey=${apiKey}`;
    },
    query: async query => await (await fetch(getURL(query))).json()
}

module.exports = news;