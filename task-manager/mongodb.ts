const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongodbURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(mongodbURL, { useNewUrlParser: true }, (error: Error, client: any) => {
    if (error) {
        console.log(error);
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    db.collection('users').insertOne({
        name: 'Shamlo',
        age: 26,
    });
});
