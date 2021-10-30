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

const categoriesCollection = "Categories"

//CREATE CATEGORY API
/*
seperate the inserting new category and creating a category collection 
into different try catch blocks to avoid errors or consistency issues
*/
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
                await db.insertOneDocument(categoriesCollection, {
                    "name" : data.category
                })
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

//EDIT CATEGORY API
/*
add checks for if collection exists or not 
*/
router.post("/edit", async (req, res) =>{
    let token = req.headers['x-access-token'];
    if (!token)
        return(res.json(errors.jwtNoTokenProvided))
    else{
        jwt.verify(token, secret, async function (err, decoded){
            if(err)
                return res.json(errors.jwtAuthenticationFailed)

            let o_id = new ObjectId(decoded._id)
            let data = {
                "old_category" : {
                    "name" : req.body.old_category.name
                },
                "new_category" : {
                    "name" : req.body.new_category.name
                }
            }
            try {
                await db.renameCollection(data.old_category.name, data.new_category.name)
                await db.modifyOneDocument(categoriesCollection, 
                    {"name" : data.old_category.name}, 
                    {
                        $set : {
                            "name" : data.new_category.name
                        }
                    })
                return res.json({
                "header": {
                    "error": 0,
                    "message": "Category edit succesfully"
                }
                })
            } catch (error) {
                return res.json(errors.databaseError(error))
            }
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
