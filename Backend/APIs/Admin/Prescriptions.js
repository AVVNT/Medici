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

const prescriptionCollection = require('../../Config.json').prescriptionsCollectionName

router.get("/getall", async (req, res) => {
    let token = req.headers['x-access-token'];
    if (!token)
        return (res.json(errors.jwtNoTokenProvided))
    else {
        jwt.verify(token, secret, async function (err, decoded) {
            if (err)
                return res.json(errors.jwtAuthenticationFailed)


            try {
                let data = await db.getAllDocuments(prescriptionCollection)
                return res.json({
                    "header": {
                        "error": 0,
                        "message": "All Prescriptions retireved succesfully"
                    },
                    "data": data
                })
            } catch (error) {
                res.json(errors.databaseError(error))
            }
        })
    }
})

module.exports = router