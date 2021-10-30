const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./Database/Connection')

const PORT = process.env.PORT || 3000;

const adminCategory = require('./APIs/Admin/Category')
const adminProducts = require('./APIs/Admin/Products')
const authentication = require('./APIs/Authentication/Authentication');

db.connectDatabase()

app.use(cors())

//ADMIN APIS
app.use('/api/admin/category', adminCategory)
app.use('/api/admin/products', adminProducts)

//AUTHENTICATION APIS
app.use('/api/authentication', authentication)

app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});

console.log("SERVER RUNNING")

module.exports = {
    jwtSecret = "abdullah"
}