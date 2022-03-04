"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL + '/' + process.env.MONGO_DB_NAME, {
    useNewUrlParser: true,
});
//# sourceMappingURL=mongoose.js.map