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
    db.collection('users')
        .find({ name: { $exists: true, $ne: null } })
        .toArray((error: Error, users: any) => {
            if (error) {
                console.log(error);
                return console.log('Unable to fetch users');
            }
            const duplicateUsers = users.filter((user: any, index: number, self: any) => {
                return (
                    self.findIndex((t: any) => {
                        return t.name === user.name;
                    }) !== index
                );
            });
            return console.log(duplicateUsers);
        });
    // db.collection('users').insertMany(
    //     [
    //         {
    //             name: 'Shamlo 1',
    //             age: 26,
    //         },
    //         {
    //             name: 'Shamlo 2',
    //             age: 26,
    //         },
    //     ],
    //     (error: Error, result: any) => {
    //         if (error) {
    //             return console.log('Unable to insert user');
    //         }

    //         return console.log(result.insertedIds);
    //     }
    // );
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
