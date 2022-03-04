export {};
const mongoose = require('mongoose');

// ----------------------------------------------------------------
// * MongoDB URL and Database name

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
});

// ----------------------------------------------------------------
