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
const MONGO_PASSWORD_ATLAS = 'tester123';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_DB}`;
const atlas_url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD_ATLAS}@470project-b2y4i.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

connectToDB();
queryUser();

function connectToDB() {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    // mongoose.connect(atlas_url, {useNewUrlParser: true, useUnifiedTopology: true});

    mongoose.connection.on("error", function(err) {
        console.log('\n\nCould not connect to Mongo Server');
        console.log(err)
    });

    mongoose.connection.on('open', function(ref) { console.log('Connected to Mongo server'); });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('\nMongoose connection closed')
            process.exit(0);
        })
    });
}

function queryUser() {
    const UserSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        email: String
    });

    var UserModel = mongoose.model('user', UserSchema)

    var result = UserModel.find(function (err, data) {
        console.log("Error: " + err + "\tData:", data);
    })
}





// Atlas code
// const MONGO_PASSWORD_ATLAS = 'tester123';
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD_ATLAS}@470project-b2y4i.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
  // const collection = client.db("${MONGO_DB}").collection("user");
//   // perform actions on the collection object
//   client.close();
// });
