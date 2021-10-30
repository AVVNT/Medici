const express = require('express')
const jwt = require('jsonwebtoken')
const bodyparser = require('body-parser')
const ObjectId = require('mongodb').ObjectID
//Has all MongoDb custom functions
const db = require('../../Database/Connection')
// Has all errors
const errors = require('../Error Messages/ErrorMessages')

// JWT secret code
const server = require('../../Server')
const secret = server.jwtSecret

const router = express.Router()

router.use(bodyparser.json())

//ADD PRODUCT API
router.post("/add", async (req, res) =>{
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

//UPDATE PRODUCT API
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

//REMOVE PRODUCT API
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
