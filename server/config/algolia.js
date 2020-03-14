// For the default version
const algoliasearch = require('algoliasearch/lite');
const client = algoliasearch('JU2Y150GB2', '58e6a27fa4ba9af2dbacdfe454318100');

const index = client.initIndex('stocks');
  
const stocks = [
    {
        objectID: 1,
        name: "TSLA"
    },
    {
        objectID: 2,
        name: "APPL"
    }
];

const saveObjects = async () => {
    try {
        await index.saveObjects(stocks);
    } catch (error) {
        console.log(error);
    }
}

const search = async () => {
    try {
        const result = await index.search("TSLA");
        console.log(result.hits);
    } catch (error) {
        console.log(error);
    }
}

saveObjects();
search();