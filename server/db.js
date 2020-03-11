const mongoose = require('mongoose');
const UserModel = require('./models/user');
const StockModel = require('./models/stock');
const CryptoModel = require('./models/crypto');

// require('dotenv').config();
// require('dotenv').config({ path: '.env' });

// Test database
const MONGO_USERNAME = 'tester';
const MONGO_PASSWORD = 'tester';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'test';
const MONGO_PASSWORD_ATLAS = 'tester123';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_DB}`;
const atlas_url = process.env.MONGODB_TEST_URI;

// addUser();
// queryUser();
// addStock();
// addCrypto();

exports.connectToDB = function connectToDB() {
    console.log(atlas_url);

    console.log(process.env.MONGODB_TEST_URI)

    // mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connect(process.env.MONGODB_TEST_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    mongoose.connection.on("error", function(err) {
        console.log('\n\nCould not connect to Mongo Server');
        console.log(err)
    });

    mongoose.connection.on('open', function(ref) { console.log('Connected to Mongo server'); });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('\nMongoose connection closed');
            process.exit(0);
        })
    });
}

function addUser() {
    new UserModel({
        name: "Fred",
        email: "fred@hotmail.com",
        last_login: Date.now(),
        stocks: [
            {
                stock_name: "Tesla",
                stock_symbol: "TSLA",
                latest_stock_price: 100
            }
        ],
        cryptos: [
            {
                crypto_name: "Bitcoin",
                cryto_symbol: "BTC",
                latest_crypto_price: 300
            }
        ]
    }).save(function(err, data) {
        if (err) {
            console.log(`Error occurred while saving: ${err}`)
        }
        console.log(data.name + " saved successfully")
    });
}

function queryUser() {
    UserModel.find(function (err, data) {
        console.log(data);
    });
}

function addStock() {
    new StockModel({
        name: "Tesla",
        symbol: "TSLA",
        latest_price: 100,
        last_retrieved: Date.now(),
        api_source: "https://rapidapi.com/apidojo/api/yahoo-finance1"
    }).save(function(err, data) {
        if (err) {
            console.log(`Error occurred while saving: ${err}`)
        }
        console.log(data.name + " saved successfully")
    });
}

function addCrypto() {
    new CryptoModel({
        name: "Bitcoin",
        crypto_id: "bitcoin",
        symbol: "BTC",
        latest_price: 300,
        last_retrieved: Date.now(),
        api_source: "https://rapidapi.com/apidojo/api/yahoo-finance1"
    }).save(function(err, data) {
        if (err) {
            console.log(`Error occurred while saving: ${err}`);
        }
        console.log(data.name + " saved successfully");
    })
}
