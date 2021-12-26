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

    db.collection('tasks')
        .deleteOne({
            description: 'Clean the house',
        })

        .then((result: any) => {
            console.log(result);
        })
        .catch((error: Error) => {
            console.log(error);
        });

    //-------------- End -----------------
});

// -------------------------------
// * Second way of connecting to mongodb
// const client = new MongoClient(mongodbURL, { useNewUrlParser: true });
// const runMongo = async () => {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//         const db = client.db(databaseName);

//         db.collection('users-test').insertOne(
//             {
//                 name: 'Test',
//             },
//             (error: Error, result: any) => {
//                 if (error) {
//                     return console.log('Unable to insert user');
//                 }
//                 return console.log('_id: ' + result.insertedId.toString());
//             }
//         );
//     } catch (error) {
//         console.log(error);
//     }
// };
// runMongo().catch(console.error);
