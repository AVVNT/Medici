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
const ErrorMessages = require('../Error Messages/ErrorMessages')

const router = express.Router()

router.use(bodyparser.json())

//ADD PRODUCT API
//Fix mongoDb error
//Comments mein likh do ke ugh ke make sure collection exists before adding product
router.post("/add", async (req, res) =>{
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let data ={
                "sku" : req.body.sku,
                "name" : req.body.name,
                "manufacturer" : req.body.manufacturer,
                "stock" : req.body.stock,
                "price" : req.body.price,
                "discounted_price" : req.body.discounted_price,
                "short_description" : req.body.short_description,
                "long_description" : req.body.long_description,
                "product_image" : req.body.product_image,
                "category" : req.body.category
            }
            try{
                // Check if Product Exists
                let productFlag = await db.getOneDocument(data.category, {
                    "sku" : data.sku
                })
                if (productFlag) {
                    return res.json(errors.productAlreadyExists)
                }
                //Add product to Category
                await db.insertOneDocument(data.category, {
                    "sku" : data.sku,
                    "name" : data.name,
                    "manufacturer" : data.manufacturer,
                    "stock" : data.stock,
                    "price" : data.price,
                    "discounted_price" : data.discounted_price,
                    "short_description" : data.short_description,
                    "long_description" : data.long_description,
                    "product_image" : data.product_image
                })
                return res.json({
                    "header" : {
                        "error": 0,
                        "message" : "Product Added Sucessfully"
                    }
                })
            } catch (error) {
                res.json(errors.databaseError(error))
            }
        })
    }
})

//UPDATE PRODUCT API
//Add Code to check if category Exist before adding
//Add Code to change Categories. 
//Nested API
//Fix Error Hndling Nally.
//NOT RUNNING
router.post("/update", async (req, res) =>{
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let data = {
               "collection_name" : req.body.collection_name,
               "_id" : req.body._id,
               "new_data" : {
                    "sku" : req.body.sku,
                    "name" : req.body.name,
                    "manufacturer" : req.body.manufacturer,
                    "stock" : req.body.stock,
                    "price" : req.body.price,
                    "discounted_price" : req.body.discounted_price,
                    "short_description" : req.body.short_description,
                    "long_description" : req.body.long_description,
                    "product_image" : req.body.product_image,
                    "category" : req.body.category
               }
            }
            console.log(data)
            try {
                let o_id = ObjectId(data._id)
                await db.modifyOneDocument(data.colllection_name, {
                    "_id" : o_id
                }, data.new_data)
                return res.json({
                    "header" : {
                        "error": 0,
                        "message" : "Product Updated Sucessfully"
                    }
                })
            } catch (error) {
                res.json(errors.databaseError(error))
            }
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
            
        })
    }
})


module.exports = router
