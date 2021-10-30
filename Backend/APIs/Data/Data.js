const express = require('express')
const bodyparser = require('body-parser')
//Has all MongoDb custom functions
const db = require('../../Database/Connection')
// Has all errors
const errors = require('../Error Messages/ErrorMessages')

const router = express.Router()

router.use(bodyparser.json())

//GET PRODUCTS BY CATEGORY API
router.post("/get", async (req, res) =>{
    
})

//SEARCH FOR PRODUCTS API
router.post("/update", async (req, res) =>{
    
})

//REMOVE PRODUCT API
router.post("/remove", async (req, res) =>{
    
})


module.exports = router
