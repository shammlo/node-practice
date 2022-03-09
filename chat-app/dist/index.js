"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));
app.listen(port, () => {
    console.log(`Server started on port ${port}, linked to http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map