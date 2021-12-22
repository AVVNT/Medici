const cron = require('node-cron')
const db = require('../Database/Connection')
const ObjectId = require('mongodb').ObjectID
const prescriptionsCollection = require('../Config.json').prescriptionsCollectionName
const userCollection = require('../Config.json').usersCategoryCollectionName
// require('google-closure-library')

// goog.require('goog.structs.PriorityQueue')


cron.schedule('0 0 0 * * *', () => {
    console.log("Task is running every midnight")
    placeOrdersFromPrescription()
    // let temp = new goog.structs.PriorityQueue()
    // console.log(temp.isEmpty())
});


async function placeOrdersFromPrescription(){
    let currentDate = new Date()
    let prescriptions = await db.getAllDocuments(prescriptionsCollection)
    prescriptions.forEach(element => {
        let diff = element.next_date - currentDate
        let diffDays = Math.ceil(diff/(1000 * 60 * 60 * 24))
        if(diffDays == 1){
            placeOrder(element)
            if(element.repeat === "weekly"){
                element.next_date = element.next_date.addDays(7)
            }
            else if(element.repeat === "biweekly"){
                element.next_date = element.next_date.addDays(3)
            }
            else if(element.repeat === "monthly"){
                element.next_date = element.next_date.addDays(30)
            }
        }
    });
}

async function placeOrder(prescription){
    let user = await db.getOneDocument(userCollection, {"_id": details._id})
    let order = {
        "user_id" : new ObjectId(details.user_id),
        "address" : user.address,
        "phone_number" : user.phone_number,
        "order" : prescription.medicines,
        "details" : {
            "status" : "order placed",
            "is_delivered" : false,
            "is_cancelled" : false
        }
    }
    try {
        await db.insertOneDocument(ordersCollection, order)
        console.log("ORDER PLACED SUCCESFULLY AUTOMATICALLY");
    } catch (error) {
        console.log(error);
    }
}


// (async() => {
//     await db.connectDatabase()
//     await placeOrdersFromPrescription()
// })()