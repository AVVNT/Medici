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

const prescriptionsCollection = require('../../Config.json').prescriptionsCollectionName

//CREATE PRESCRIPTION API
/*

*/
router.post("/createprescription", async (req, res) =>{
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
                "title" : req.body.title,
                "medicines" : req.body.medicines,
                "repeat" : req.body.repeat,
                "next_date" : new Date()
            }
            if(data.repeat === "weekly"){
                data.next_date = data.next_date.addDays(7)
            }
            else if(data.repeat === "biweekly"){
                data.next_date = data.next_date.addDays(3)
            }
            else if(data.repeat === "monthly"){
                data.next_date = data.next_date.addDays(30)
            }
            try {
                // Add Prescription to collection
                await db.insertOneDocument(prescriptionsCollection, data)
                return res.json({
                    "header": {
                        "error": 0,
                        "message": "Added prescription succesfully"
                    }
                })
            } catch (error) {
                return res.json(errors.databaseError(error))
            }
        })
    }
})

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

router.get("/getallprescriptions", async (req, res) => {
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let user_o_id = new ObjectId(decoded._id)
            let query = {
                "user_id" : user_o_id
            }
            try {
                let data = await db.getManyDocuments(prescriptionsCollection, query)
                return res.json({
                    "header": {
                        "error": 0,
                        "message": "Retrieved all prescriptions of user succesfully"
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

router.post("/getprescription", async (req, res) => {
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let user_o_id = new ObjectId(decoded._id)
            let prescription_id = new ObjectId(req.body._id)
            let query = {
                "_id" : prescription_id,
                "user_id" : user_o_id
            }
            try {
                let data = await db.getOneDocument(prescriptionsCollection, query)
                return res.json({
                    "header": {
                        "error": 0,
                        "message": "Retrieved one prescription succesfully"
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

router.post("/deleteprescription", async (req, res) => {
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let user_o_id = new ObjectId(decoded._id)
            let prescription_id = new ObjectId(req.body._id)
            let query = {
                "_id" : prescription_id,
                "user_id" : user_o_id
            }
            try {
                let data = await db.removeOneDocument(prescriptionsCollection, query)
                return res.json({
                    "header": {
                        "error": 0,
                        "message": "Deleted prescription succesfully"
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

//modify prescription

module.exports = router