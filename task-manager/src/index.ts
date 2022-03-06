const dotenv = require('dotenv').config('../env');
const app = require('./ExpressApp');
require('./database/mongoose');

const port = process.env.PORT || 3000;
// -------------------------------
// **** LISTENING ****
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
