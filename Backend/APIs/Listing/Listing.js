const express = require('express')
const bodyparser = require('body-parser')
const ObjectId = require('mongodb').ObjectID
//Has all MongoDb custom functions
const db = require('../../Database/Connection')
// Has all errors
const errors = require('../Error Messages/ErrorMessages')
// Config file
const config = require('../../Config.json')

const router = express.Router()

router.use(bodyparser.json())

//GET PRODUCTS BY CATEGORY API
/*
add error check for page 0 (page 0 is invalid), postman returns mongo "badvalue" error on page 0
*/
router.post("/getbycategory", async (req, res) =>{
    let request = {
        "category" : req.body.category,
        "page" : req.body.page
    }
    // check if category exists or not
    let categoryFlag = await db.getOneDocument(config.categoriesCollectionName, {
        "name" : request.category
    })
    // return missing category json response
    if(!categoryFlag)
        return res.json(errors.categoryMissing)
    try {
        //start page with 1
        let limit = 10
        let starting_index = (request.page * limit) - limit
        let documents = await db.getAllDocumentsPagination(request.category, starting_index, limit)
        return res.json({
            "header" : {
                "error" : 0,
                "message" : "Listing items from " + starting_index + " to " + (starting_index+limit)
            },
            "body" : {
                "data" : documents
            }
        })
    } catch (error) {
        return res.json(errors.databaseError(error))
    }
})

//SEARCH FOR PRODUCTS API
router.post("/search", async (req, res) =>{
    try {
        let query = {
            $or : [
                {
                    'name': {'$regex': req.body.search, '$options': 'i'}
                },
            ]
        }
        let result = await db.getManyDocuments(hallCollections, query)
        return(res.json({
            "header": {
                "error": 0,
                "message": "Searched succesfully"
            },
            "body": result
        }))

    } catch (error) {
        return(res.json(errors.databaseError(error)))
    }
})

//GET SINGLE PRODUCT API
/*
make sure object id is of the specified length otherwise mongo throws error
*/
router.post("/getsingleproduct", async (req, res) =>{
    let data = {
        "category" : req.body.category,
        "_id" : req.body._id
    }
    let o_id = ObjectId(data._id)
    try {
        let result = await db.getOneDocument(data.category, {
            "_id" : o_id
        })
        if(!result){
            return res.json(errors.productNotFound)
        }
        return res.json({
            "header": {
                "error": 0,
                "message": "Single Product Found"
            },
            "body": result
        })
    } catch (error) {
        res.json(errors.databaseError(error))
    }
})

module.exports = router
