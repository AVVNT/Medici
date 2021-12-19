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
                "details" : req.body.details,
                "short_description" : req.body.short_description,
                "long_description" : req.body.long_description,
                "product_image" : req.body.product_image,
                "category" : req.body.category.toLowerCase()
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
                console.log(data)
                await db.insertOneDocument(data.category, {
                    "sku" : data.sku,
                    "name" : data.name,
                    "manufacturer" : data.manufacturer,
                    "stock" : data.stock,
                    "price" : data.price,
                    "details" : data.details,
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
                console.log(error);
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
//Make sure Product Iteslf exsist or not
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
                    "sku" : req.body.new_data.sku,
                    "name" : req.body.new_data.name,
                    "manufacturer" : req.body.new_data.manufacturer,
                    "stock" : req.body.new_data.stock,
                    "price" : req.body.new_data.price,
                    "discounted_price" : req.body.new_data.discounted_price,
                    "short_description" : req.body.new_data.short_description,
                    "long_description" : req.body.new_data.long_description,
                    "product_image" : req.body.new_data.product_image,
                    "category" : req.body.new_data.category
               }
            }
            try {
                let o_id = ObjectId(data._id)
                await db.modifyOneDocument(data.collection_name, {
                    "_id" : o_id
                }, 
                    {
                        $set : {
                            "sku" : data.new_data.sku,
                            "name" : data.new_data.name,
                            "manufacturer" : data.new_data.manufacturer,
                            "stock" : data.new_data.stock,
                            "price" : data.new_data.price,
                            "discounted_price" : data.new_data.discounted_price,
                            "short_description" : data.new_data.short_description,
                            "long_description" : data.new_data.long_description,
                            "product_image" : data.new_data.product_image,
                            "category" : data.new_data.category
                        }
                    }
                )
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
//Add Data retention of Remove product
router.post("/remove", async (req, res) =>{
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let data = {
                "collection_name" : req.body.collection_name,
               "_id" : req.body._id
            }
            try{
                let o_id = ObjectId(data._id)
                await db.removeOneDocument(data.collection_name,{
                    "_id" : o_id
                })
                return res.json({
                    "header" : {
                        "error": 0,
                        "message" : "Product Deleted Sucessfully"
                    }
                })
            } catch(error) {
                res.json(errors.databaseError(error))
            }
        })
    }
})

module.exports = router