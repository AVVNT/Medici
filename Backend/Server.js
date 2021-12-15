const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./Database/Connection')

const PORT = process.env.PORT || 3000;

require('./CRON/cron')

const adminAuth = require('./APIs/Admin/Authentication')
const adminCategory = require('./APIs/Admin/Category')
const adminProducts = require('./APIs/Admin/Products')
const authentication = require('./APIs/Authentication/Authentication');
const listing = require('./APIs/Listing/Listing')
const userPrescriptions = require('./APIs/Users/Prescriptions')
const orders = require('./APIs/Orders/Orders')

db.connectDatabase()

app.use(cors())

//ADMIN APIS
app.use('/api/admin/authentication', adminAuth)
app.use('/api/admin/category', adminCategory)
app.use('/api/admin/products', adminProducts)

//AUTHENTICATION APIS
app.use('/api/authentication', authentication)

//LISTING APIS
app.use('/api/listing', listing)

//USER APIS
app.use('/api/user/prescription', userPrescriptions)

//ORDERS APIS
app.use('/api/orders', orders)

app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});

console.log("SERVER RUNNING")