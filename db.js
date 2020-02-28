const mongoose = require('mongoose');

// Main Project database
/*
const MONGO_USERNAME = 'MainUser';
const MONGO_PASSWORD = 'ProjectUser';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'project';
*/

// Test database
const MONGO_USERNAME = 'tester';
const MONGO_PASSWORD = 'tester';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'test';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_DB}`;

mongoose.connect(url, {useNewUrlParser: true});

