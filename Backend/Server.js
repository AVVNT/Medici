const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./Database/Connection')

const PORT = process.env.PORT || 3000;

const authentication = require('./APIs/Authentication/Authentication');

db.connectDatabase()

app.use(cors())

app.use('/api/authentication', authentication)

app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});

console.log("SERVER RUNNING")