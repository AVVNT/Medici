const cron = require('node-cron')
const db = require('../Database/Connection')
const collection = require('../Config.json').prescriptionsCollectionName
// require('google-closure-library')

// goog.require('goog.structs.PriorityQueue')


// cron.schedule('* * * * *', () => {
//     // console.log("Task is running every minute " + new Date())
//     let temp = new goog.structs.PriorityQueue()
//     console.log(temp.isEmpty())
// });


async function placeOrdersFromPrescription(){
    let currentDate = new Date()
    let prescriptions = await db.getAllDocuments(collection)
    prescriptions.forEach(element => {
        let diff = element.next_date - currentDate
        console.log(new Date(diff))
    });
}


(async() => {
    await db.connectDatabase()
    await placeOrdersFromPrescription()
})()