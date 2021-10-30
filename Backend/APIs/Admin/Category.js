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

//CREATE CATEGORY API
router.post("/create", async (req, res) =>{
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let o_id = new ObjectId(decoded._id)
            let data = {
                "category" : req.body.category
            }
            try {
                await db.createCollection(data.category)
                return res.json({
                    "header": {
                        "error": 0,
                        "message": "Created category succesfully"
                    }
                })
            } catch (error) {
                if(error.codeName == "NamespaceExists")
                return res.json(errors.databaseError("Category already exists"))
            }
        })
    }
})

//UPDATE CATEGORY API
router.post("/update", async (req, res) =>{
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let o_id = new ObjectId(decoded._id)
            //ADD CODE HERER\
        })
    }
})

//REMOVE CATEGORY API
router.post("/remove", async (req, res) =>{
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let o_id = new ObjectId(decoded._id)
            //ADD CODE HERER\
        })
    }
})


module.exports = router
