const express = require('express')
const jwt = require('jsonwebtoken')
const bodyparser = require('body-parser')
const ObjectId = require('mongodb').ObjectID
//Has all MongoDb custom functions
const db = require('../../Database/Connection')
// Has all errors
const errors = require('../Error Messages/ErrorMessages')

// JWT secret code
const secret = require('../../Config.json').secret

const router = express.Router()

router.use(bodyparser.json())

const ordersCollection = require('../../Config.json').ordersCollectionName

//PLACE ORDER API
/*

*/
router.post("/placeorder", async (req, res) =>{
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let o_id = new ObjectId(decoded._id)
            let data = {
                "user_id" : o_id,
                "address" : req.body.address,
                "phone_number" : req.body.phone_number,
                "order" : req.body.order,
                "details" : {
                    "status" : "order placed",
                    "is_delivered" : false,
                    "is_cancelled" : false
                }
            }
            try {
                await db.insertOneDocument(ordersCollection, data)
                return res.json({
                    "header": {
                        "error": 0,
                        "message": "Order Placed succesfully"
                    }
                })
            } catch (error) {
                return res.json(errors.databaseError(error))
            }
        })
    }
})

router.get("/getorders", async (req, res) => {
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let user_o_id = new ObjectId(decoded._id)
            let filter = req.query.filter

            let query = {}
            if(filter == undefined){
                query = {
                    "user_id" : user_o_id,
                }
            }
            else if(filter === "is_delivered"){
                query = {
                    "user_id" : user_o_id,
                    "details.is_delivered" : true
                }
            }
            else if(filter === "is_cancelled"){
                query = {
                    "user_id" : user_o_id,
                    "details.is_cancelled" : true
                }
            }
            else if(filter === "in_progress"){
                query = {
                    "user_id" : user_o_id,
                    "details.is_delivered" : false,
                    "details.is_cancelled" : false
                }
            }

            try {
                let data = await db.getManyDocuments(ordersCollection, query)
                return res.json({
                    "header": {
                        "error": 0,
                        "message": "Retrieved all orders of user succesfully"
                    },
                    "body" : {
                        data
                    }
                })
            } catch (error) {
                return res.json(errors.databaseError(error))
            }
        })
    }
})

router.post("/cancelorder", async (req, res) => {
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let user_o_id = new ObjectId(decoded._id)
            let order_id = new ObjectId(req.body._id)
            let query = {
                "_id" : order_id,
                "user_id" : user_o_id
            }
            try {
                let response = await db.modifyOneDocument(ordersCollection, query, {
                    $set : {
                        "details.is_cancelled" : true
                    }
                })
                if(response.matchedCount == 0){
                    return res.json(errors.permissionDenied)
                }
                return res.json({
                    "header": {
                        "error": 0,
                        "message": "Cancelled order succesfully"
                    },
                    "body" : {
                        response
                    }
                })
            } catch (error) {
                return res.json(errors.databaseError(error))
            }
        })
    }
})

//modify prescription

module.exports = router